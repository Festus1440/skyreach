#!/bin/bash

# Git add, commit, and push script
# Usage: ./git-push.sh

# Hardcoded commit message
COMMIT_MESSAGE="Update"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not a git repository${NC}"
    exit 1
fi

# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Show current status
echo -e "${YELLOW}Current git status:${NC}"
git status --short

# Ask for confirmation
echo -e "\n${YELLOW}Proceed with:${NC}"
echo -e "  ${GREEN}git add .${NC}"
echo -e "  ${GREEN}git commit -m \"$COMMIT_MESSAGE\"${NC}"
echo -e "  ${GREEN}git push -u origin $CURRENT_BRANCH${NC}"
echo -e "\n${YELLOW}Continue? (y/n):${NC}"
read -r CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo -e "${RED}Cancelled${NC}"
    exit 0
fi

# Stage all changes
echo -e "\n${YELLOW}Staging changes...${NC}"
if ! git add .; then
    echo -e "${RED}Error: Failed to stage changes${NC}"
    exit 1
fi

# Check if there are any changes to commit
if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to commit${NC}"
    # Still try to push if there are unpushed commits
    echo -e "${YELLOW}Pushing existing commits...${NC}"
    if ! git push -u origin "$CURRENT_BRANCH"; then
        echo -e "${RED}Error: Failed to push changes${NC}"
        exit 1
    fi
    echo -e "\n${GREEN}✓ Successfully pushed to remote!${NC}"
    exit 0
fi

# Commit changes
echo -e "${YELLOW}Committing changes...${NC}"
if ! git commit -m "$COMMIT_MESSAGE"; then
    echo -e "${RED}Error: Failed to commit changes${NC}"
    exit 1
fi

# Push changes
echo -e "${YELLOW}Pushing to remote...${NC}"
if ! git push -u origin "$CURRENT_BRANCH"; then
    echo -e "${RED}Error: Failed to push changes${NC}"
    exit 1
fi

echo -e "\n${GREEN}✓ Successfully pushed to remote!${NC}"
