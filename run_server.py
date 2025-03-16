#!/usr/bin/env python

"""
A script to run the Django development server with settings
that make it accessible from other devices on the same network.
"""

import os
import sys
import subprocess
import time
from ipaddress import IPv4Network
import socket

def get_local_ip():
    """Get the local IP address of this machine."""
    try:
        # Create a socket that connects to an external server
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"  # Fallback to localhost

def main():
    print("Starting Django development server for external access...")
    
    # Get the local IP address
    local_ip = get_local_ip()
    print(f"Your local IP address is: {local_ip}")
    print(f"Other devices on your network can access this server at: http://{local_ip}:8000/")
    
    # Run Django server with the local IP address
    subprocess.run(f"python manage.py runserver {local_ip}:8000", shell=True)

if __name__ == "__main__":
    main() 