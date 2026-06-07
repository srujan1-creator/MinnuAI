import http.server
import socketserver
import json
import sqlite3
import hashlib
import os

PORT = int(os.environ.get('PORT', 8000))

def init_db(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            name TEXT,
            role TEXT,
            password_hash TEXT,
            profile_pic TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Check/add profile_pic column for backwards compatibility
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN profile_pic TEXT")
        conn.commit()
    except sqlite3.OperationalError:
        pass
    
    # Seed default admin user if empty
    cursor.execute('SELECT COUNT(*) FROM users')
    if cursor.fetchone()[0] == 0:
        admin_pass = "password123"
        admin_hash = hashlib.sha256(admin_pass.encode('utf-8')).hexdigest()
        cursor.execute('''
            INSERT INTO users (username, name, role, password_hash)
            VALUES (?, ?, ?, ?)
        ''', ('admin', 'Admin Barista', 'Lead Orchestrator', admin_hash))
        conn.commit()
        print(f"Pre-seeded database with default admin user. Username: admin, Password: {admin_pass}")
    conn.close()

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Override to log clean messages to terminal
        print(f"[SERVER] - - [{self.log_date_time_string()}] " + (format % args))

    def send_json_response(self, status, data):
        response_bytes = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(response_bytes)))
        # Disable caching for APIs
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.end_headers()
        self.wfile.write(response_bytes)

    def do_POST(self):
        if self.path == '/api/register':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                username = data.get('username', '').strip()
                name = data.get('name', '').strip()
                role = data.get('role', '').strip()
                password = data.get('password', '')

                if not username or not name or not role or not password:
                    self.send_json_response(400, {"error": "All fields are required."})
                    return

                password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()

                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                try:
                    cursor.execute('''
                        INSERT INTO users (username, name, role, password_hash)
                        VALUES (?, ?, ?, ?)
                    ''', (username, name, role, password_hash))
                    conn.commit()
                    self.send_json_response(200, {
                        "success": True,
                        "user": {"username": username, "name": name, "role": role, "profile_pic": None}
                    })
                except sqlite3.IntegrityError:
                    self.send_json_response(400, {"error": "Username already exists."})
                finally:
                    conn.close()

            except Exception as e:
                self.send_json_response(500, {"error": f"Registration failed: {str(e)}"})

        elif self.path == '/api/login':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                username = data.get('username', '').strip()
                password = data.get('password', '')

                if not username or not password:
                    self.send_json_response(400, {"error": "Username and password are required."})
                    return

                password_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()

                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('''
                    SELECT name, role, profile_pic FROM users 
                    WHERE username = ? AND password_hash = ?
                ''', (username, password_hash))
                row = cursor.fetchone()
                conn.close()

                if row:
                    self.send_json_response(200, {
                        "success": True,
                        "user": {"username": username, "name": row[0], "role": row[1], "profile_pic": row[2]}
                    })
                else:
                    self.send_json_response(401, {"error": "Invalid username or password."})

            except Exception as e:
                self.send_json_response(500, {"error": f"Login failed: {str(e)}"})

        elif self.path == '/api/update_profile':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                username = data.get('username', '').strip()
                name = data.get('name', '').strip()
                role = data.get('role', '').strip()
                profile_pic = data.get('profile_pic', None)

                if not username or not name or not role:
                    self.send_json_response(400, {"error": "Username, name, and role are required."})
                    return

                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('''
                    UPDATE users 
                    SET name = ?, role = ?, profile_pic = ?
                    WHERE username = ?
                ''', (name, role, profile_pic, username))
                conn.commit()
                conn.close()

                self.send_json_response(200, {
                    "success": True,
                    "user": {"username": username, "name": name, "role": role, "profile_pic": profile_pic}
                })

            except Exception as e:
                self.send_json_response(500, {"error": f"Profile update failed: {str(e)}"})
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    # Store absolute path to database in workspace root
    DB_FILE = os.path.abspath('users.db')
    
    # Initialize DB
    init_db(DB_FILE)
    
    # Change working directory to dashboard to serve static files
    os.chdir('dashboard')
    
    # Run the server
    handler = CustomHandler
    # Allow socket address reuse to prevent address-already-in-use errors
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("0.0.0.0", PORT), handler) as httpd:
        print(f"Server started on port {PORT}. Access dashboard: http://localhost:{PORT}/index.html")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
