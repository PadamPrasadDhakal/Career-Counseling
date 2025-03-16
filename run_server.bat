@echo off
echo ======================================================
echo Starting Django Development Server for Network Access
echo ======================================================

REM Get the IP address
FOR /F "tokens=4 delims= " %%i in ('route print ^| find " 0.0.0.0"') do set LOCAL_IP=%%i

echo.
echo Your local IP address is: %LOCAL_IP%
echo Other devices on your network can access this server at: http://%LOCAL_IP%:8000/
echo.
echo Starting the server...
echo.

python manage.py runserver %LOCAL_IP%:8000

pause 