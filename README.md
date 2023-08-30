# Reviews-API

GIT Collaborative Workflow:
Working on a Single Repository (No Forks):

1. Initial Setup:
1.1. Clone the Repository:
Clone the main repository to your local machine.

2. Sync with the Main Repository:
2.1. Checkout the Main Branch:
This ensures you're working off the latest version.
git checkout main

2.2. Pull the Latest Changes:
Always pull the latest changes from the main branch before starting new work to avoid conflicts later.
git pull

3. Feature Development:
3.1. Create a Feature Branch:
Always work on a new branch for each feature or module. This keeps work isolated and organized.
git checkout -b feature/FEATURE_NAME

3.2. Coding:
Make your code changes. Remember to frequently commit your changes with meaningful commit messages.
git add . (or add your file seperately)
git commit -m "Detailed description of the changes made."

3.3. Push the Feature Branch to the Main Repository:
Once the feature is complete and tested locally, push your branch to the main repository.
git push -u origin feature/FEATURE_NAME

4. Create a Pull Request (PR):
4.1. Navigate to the Main Repository on GitHub
4.2. Initiate a Pull Request
4.3. Request Reviews by inviting reviewers

5. Code Review & Merging:
5.1. Reviewing
5.2. Merging:
Once the PR is approved, it gets merged into the main branch. 

6. Syncing Post-Merge:
6.1. Checkout Main & Pull:
After your feature has been merged, or when any other feature is merged, ensure you sync your local main branch.
git checkout main
git pull





