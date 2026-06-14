import http.server
import socketserver
import json
import sqlite3
import hashlib
import os

PORT = int(os.environ.get('PORT', 8000))
DB_FILE = os.path.abspath('users.db')

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
    
    # Create inventory table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS inventory (
            item TEXT UNIQUE,
            qty REAL
        )
    ''')
    
    # Create sales table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            drink_name TEXT,
            price REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    
    # Seed default inventory if empty
    cursor.execute('SELECT COUNT(*) FROM inventory')
    if cursor.fetchone()[0] == 0:
        default_stock = [
            ("water", 2000.0),
            ("milk", 2000.0),
            ("oat_milk", 1000.0),
            ("soy_milk", 1000.0),
            ("coffee_beans", 500.0),
            ("lavender_syrup", 200.0),
            ("gold_dust", 20.0),
            ("cups", 50.0)
        ]
        cursor.executemany('INSERT INTO inventory (item, qty) VALUES (?, ?)', default_stock)
        conn.commit()
        print("Pre-seeded database with initial inventory levels.")

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

    def do_GET(self):
        if self.path == '/api/inventory':
            try:
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('SELECT item, qty FROM inventory')
                rows = cursor.fetchall()
                conn.close()
                stock = {row[0]: row[1] for row in rows}
                self.send_json_response(200, {"success": True, "inventory": stock})
            except Exception as e:
                self.send_json_response(500, {"error": f"Failed to fetch inventory: {str(e)}"})
        elif self.path == '/api/sales_report':
            try:
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('SELECT SUM(price), COUNT(*) FROM sales')
                row = cursor.fetchone()
                total_revenue = row[0] if row[0] is not None else 0.0
                sales_count = row[1]
                
                cursor.execute('SELECT drink_name, COUNT(*) as c FROM sales GROUP BY drink_name ORDER BY c DESC')
                rows = cursor.fetchall()
                conn.close()
                
                popular_drinks = {row[0]: row[1] for row in rows}
                self.send_json_response(200, {
                    "success": True,
                    "report": {
                        "total_revenue": total_revenue,
                        "sales_count": sales_count,
                        "popular_drinks": popular_drinks
                    }
                })
            except Exception as e:
                self.send_json_response(500, {"error": f"Failed to fetch sales report: {str(e)}"})
        else:
            super().do_GET()

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

        elif self.path == '/api/inventory/restock':
            try:
                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                default_stock = {
                    "water": 2000.0,
                    "milk": 2000.0,
                    "oat_milk": 1000.0,
                    "soy_milk": 1000.0,
                    "coffee_beans": 500.0,
                    "lavender_syrup": 200.0,
                    "gold_dust": 20.0,
                    "cups": 50.0
                }
                for item, qty in default_stock.items():
                    cursor.execute('UPDATE inventory SET qty = ? WHERE item = ?', (qty, item))
                conn.commit()
                conn.close()
                self.send_json_response(200, {"success": True, "message": "All stock replenished to peak capacities."})
            except Exception as e:
                self.send_json_response(500, {"error": f"Restocking failed: {str(e)}"})

        elif self.path == '/api/order':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                drink_id = data.get('drink_id', '').strip()
                size = data.get('size', 'M').strip().upper()
                milk_type = data.get('milk_type', 'Standard').strip()
                extra_shots = int(data.get('extra_shots', 0))

                drinks = {
                    "1": {"name": "Espresso", "price": 3.00, "beans": 15, "water": 50, "milk": 0, "lavender": 0, "gold": 0},
                    "2": {"name": "Americano", "price": 3.50, "beans": 15, "water": 200, "milk": 0, "lavender": 0, "gold": 0},
                    "3": {"name": "Latte", "price": 4.50, "beans": 15, "water": 50, "milk": 150, "lavender": 0, "gold": 0},
                    "4": {"name": "Cappuccino", "price": 4.50, "beans": 15, "water": 50, "milk": 100, "lavender": 0, "gold": 0},
                    "5": {"name": "Gemma 4 (Signature)", "price": 6.50, "beans": 30, "water": 80, "milk": 150, "lavender": 15, "gold": 1}
                }

                if drink_id not in drinks:
                    self.send_json_response(400, {"error": "Invalid drink ID."})
                    return

                drink = drinks[drink_id]
                size_price_mult = 1.2
                size_ing_mult = 1.2
                if size == 'S':
                    size_price_mult = 1.0
                    size_ing_mult = 1.0
                elif size == 'L':
                    size_price_mult = 1.4
                    size_ing_mult = 1.5

                req_beans = drink["beans"] * size_ing_mult + (extra_shots * 15)
                req_water = drink["water"] * size_ing_mult
                req_milk = drink["milk"] * size_ing_mult
                req_lavender = drink["lavender"] * size_ing_mult
                req_gold = drink["gold"] * size_ing_mult

                required = {
                    "coffee_beans": req_beans,
                    "water": req_water,
                    "cups": 1.0
                }
                if req_lavender > 0:
                    required["lavender_syrup"] = req_lavender
                if req_gold > 0:
                    required["gold_dust"] = req_gold
                if req_milk > 0:
                    if milk_type == 'Oat':
                        required["oat_milk"] = req_milk
                    elif milk_type == 'Soy':
                        required["soy_milk"] = req_milk
                    elif milk_type == 'Standard':
                        required["milk"] = req_milk

                conn = sqlite3.connect(DB_FILE)
                cursor = conn.cursor()
                cursor.execute('SELECT item, qty FROM inventory')
                rows = cursor.fetchall()
                stock = {row[0]: row[1] for row in rows}

                missing = []
                for item, qty in required.items():
                    if stock.get(item, 0.0) < qty:
                        missing.append(f"{item} (need {qty:.1f}, have {stock.get(item, 0.0):.1f})")

                if missing:
                    conn.close()
                    self.send_json_response(400, {"error": "Insufficient ingredients.", "missing": missing})
                    return

                for item, qty in required.items():
                    new_qty = max(0.0, stock[item] - qty)
                    cursor.execute('UPDATE inventory SET qty = ? WHERE item = ?', (new_qty, item))

                final_price = drink["price"] * size_price_mult + (extra_shots * 0.80)
                cursor.execute('INSERT INTO sales (drink_name, price) VALUES (?, ?)', (drink["name"], final_price))
                conn.commit()
                conn.close()

                # Generate physical receipt ticket
                import datetime
                ticket_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                ticket_str = f"""========================================
           MINNU AI COFFEE SHOP         
             ORDER RECEIPT             
========================================
Timestamp:   {ticket_time}
Drink:       {drink['name']}
Size:        {size}
Milk Type:   {milk_type}
Extra Shots: {extra_shots}
----------------------------------------
Total Price: ${final_price:.2f}
Status:      Paid & Served (Web Order)
========================================
"""
                print("\n[SERVER] Printing Receipt Ticket:")
                print(ticket_str)
                
                # Save ticket to workspace root
                root_dir = os.path.dirname(os.path.abspath(__file__))
                ticket_path = os.path.join(root_dir, "latest_order_ticket.txt")
                try:
                    with open(ticket_path, "w", encoding="utf-8") as f:
                        f.write(ticket_str)
                    print(f"[SERVER] Receipt ticket saved to: {ticket_path}")
                except Exception as file_err:
                    print(f"[SERVER] Failed to save receipt ticket file: {file_err}")

                self.send_json_response(200, {
                    "success": True,
                    "drink_name": drink["name"],
                    "price": final_price,
                    "receipt": {
                        "drink": drink["name"],
                        "size": size,
                        "milk": milk_type,
                        "extra_shots": extra_shots,
                        "price": final_price
                    }
                })
            except Exception as e:
                self.send_json_response(500, {"error": f"Failed to place order: {str(e)}"})
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
