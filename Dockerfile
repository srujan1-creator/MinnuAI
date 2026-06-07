FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy all project files
COPY . .

# Expose port (Render injects PORT env var)
EXPOSE 10000

# Start the server
CMD ["python", "server.py"]
