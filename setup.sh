#!/bin/bash

# Prompt user for the new repository name
echo "Enter the new repository name (e.g., medicare-api):"
read repo_name

# Optional: Prompt for the repository visibility (public/private)
echo "Do you want the repository to be public or private? (p/P for private, anything else for public):"
read visibility

if [[ "$visibility" == "p" || "$visibility" == "P" ]]; then
  visibility_flag="--private"
else
  visibility_flag="--public"
fi

# Get the GitHub username
username=$(gh api user | jq -r .login)

# Create a new GitHub repository using the GitHub CLI
echo "Creating the new GitHub repository $repo_name under user $username..."
gh repo create "$username/$repo_name" --source=. $visibility_flag --remote=origin

# Check if the remote "origin" already exists
if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote 'origin' already exists. Updating the remote URL..."
  git remote set-url origin "https://github.com/$username/$repo_name.git"
else
  echo "Adding the new remote..."
  git remote add origin "https://github.com/$username/$repo_name.git"
fi

# Add `.env` to `.gitignore` if it's not already there
if ! grep -q ".env" .gitignore; then
  echo ".env" >> .gitignore
  echo "Added .env to .gitignore"
else
  echo ".env is already listed in .gitignore"
fi

# Commit and push if the user wants to
echo "Would you like to commit and push the current code to the new repository? (y/n)"
read push_confirm

if [[ "$push_confirm" == "y" ]]; then
  echo "Pushing the code to the remote repository on the 'main' branch..."

  # Check out 'main' or 'master' branch depending on the situation
  git checkout main 2>/dev/null || git checkout master 2>/dev/null || {
    echo "No 'main' or 'master' branch found. Please make sure you're on the right branch."
    exit 1
  }

  git add .
  git commit -m "Initial commit"
  git push -u origin "$(git rev-parse --abbrev-ref HEAD)"
else
  echo "Push operation skipped."
fi

echo "Setup complete!"