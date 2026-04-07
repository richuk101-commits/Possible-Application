@echo off
echo.
echo === Starting GitHub Push ===
echo.

:: Initialize if needed
if not exist .git (
    echo Initializing Git...
    git init
)

:: Set Git Identity (Required for commit to work)
echo Setting temporary git identity...
git config user.email "richu@possible-platform.local"
git config user.name "Rich"

:: Ensure we are on 'main' branch
git checkout -b main 2>nul || git checkout main

:: Add and Commit
echo Staging files...
git add .
echo Committing...
git commit -m "Initial commit of Possible-Application"

:: Clean up remote
echo Updating remote settings...
git remote remove origin 2>nul
git remote add origin https://github.com/richuk101-commits/Possible-Application.git

:: Push
echo.
echo Pushing to GitHub (this may take a moment)...
git push -u origin main -f

echo.
echo === Done! ===
pause
