#!/usr/bin/env python

"""
A simple script to restart the Django development server
with the updated configurations for image cropping.
"""

import os
import sys
import subprocess
import time

def main():
    print("Stopping any running Django server...")
    # This is a best effort to kill any running Django server
    try:
        subprocess.run("taskkill /f /im python.exe", shell=True)
    except:
        pass
    
    time.sleep(1)
    
    print("Running database migrations...")
    subprocess.run("python manage.py makemigrations", shell=True)
    subprocess.run("python manage.py migrate", shell=True)
    
    print("Collecting static files...")
    subprocess.run("python manage.py collectstatic --noinput", shell=True)
    
    print("Starting Django server...")
    subprocess.run("python manage.py runserver", shell=True)

if __name__ == "__main__":
    main() 