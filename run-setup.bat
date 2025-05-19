@echo off
set /p libName=Enter project/library name (e.g. chart, animation, business, canteen): 
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\setup.ps1" -LibraryName %libName% -BatchPath "%~f0"