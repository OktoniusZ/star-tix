#!/bin/bash

# Check if a commit message is provided
if [ -z "$1" ]; then
  echo "Error: No commit message provided."
  echo "Usage: ./git-automation.sh \"Your commit message\""
  exit 1
fi

COMMIT_MSG="$1"

# Add and commit changes
git add .
git commit -m "$COMMIT_MSG"

# Checkout master branch and update it
git checkout master
git pull origin master

# Merge development into master
git merge development

# Push changes to remote repository
git push origin master
git push origin development

# Switch back to development and update it
git checkout development
git pull origin master

echo "✅ Git automation completed successfully!"
