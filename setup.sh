#!/bin/bash

# This script is meant to be run after cloning the repository
# It will help set up the project for development

echo "Welcome to the NestJS Boilerplate Setup"

# Step 1: Install dependencies
echo "Installing dependencies using npm..."
npm install

# Step 2: Remove existing git remote
echo "Removing existing git remote..."
git remote remove origin

# Step 3: Prompt user for a new git remote URL
echo "Enter the new remote repository URL (e.g., https://github.com/username/repo.git):"
read REMOTE_URL

# Step 4: Add the new git remote
echo "Adding the new remote..."
git remote add origin "$REMOTE_URL"

# Step 5: Verify the new remote URL
echo "New remote repository has been set to:"
git remote -v

# Step 6: Ask if user wants to commit and push changes
echo "Would you like to commit and push the current code to the new repository? (y/n)"
read PUSH_CONFIRM

if [ "$PUSH_CONFIRM" = "y" ]; then
  # Step 7: Get the current branch name
  current_branch=$(git branch --show-current)
  
  if [ -z "$current_branch" ]; then
    # If the current branch is empty, initialize the repository and set a branch
    echo "No branch detected, initializing a new repository with 'main' branch."
    git checkout -b main
    current_branch="main"
  fi

  # Step 8: Commit and push
  git add .
  git commit -m "Initial commit"
  
  echo "Pushing the code to the remote repository on the '$current_branch' branch..."
  git push -u origin "$current_branch"
fi

echo "Setup complete!"