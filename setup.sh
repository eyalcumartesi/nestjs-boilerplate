#!/bin/bash

# Ask the user for the new remote URL
echo "Enter the new remote repository URL (e.g., https://github.com/username/repo.git):"
read new_remote

# Check if the remote URL was provided
if [ -z "$new_remote" ]; then
  echo "No remote URL provided. Exiting..."
  exit 1
fi

# Remove the current origin
echo "Removing the existing origin..."
git remote remove origin

# Add the new remote
echo "Adding the new remote..."
git remote add origin "$new_remote"

# Confirm the new remote has been added
echo "New remote repository has been set to:"
git remote -v

# Optional: Initialize the repo, commit changes, and push to the new remote
echo "Would you like to commit and push the current code to the new repository? (y/n)"
read push_choice

if [ "$push_choice" = "y" ]; then
  # Add all files, commit, and push to the new origin
  git add .
  git commit -m "Initial commit from boilerplate"
  git push -u origin main
fi

echo "Setup complete!"