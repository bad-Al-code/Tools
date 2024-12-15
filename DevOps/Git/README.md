# Source Control

- how do you or friends/teammates keep track of changes in codebase?
- Basically, its like a database of files and histories of their stats.

# Git

- it assigns a hash (random) to the changes to the repository (commits), which is then used to refer those changes.

### Branches

- suppose, you are working on something, and your manager/teams ask for a new features, so instead of directly coding
  on main branch, you create a new branch, understand like a new repository from that point of time in histroy. And
  make that feature, and after testing, you can merge to main branch.

- Branching is cheap. { O(1), to be precise }

- `git branch` -> create a new branch
- `git checkout` -> move `HEAD` pointer to an arbitrary point

  - `HEAD` => where Git currently thinks it is.
  - `Detached HEAD` => means you are at a commit that has no references (branch or tag) associated with it.

- _there is nothing special about `master/main` branch. Its just a name._

### Github

- **Upstream** -> the repository, from which the source code is taken
- **Downstream** -> the repository, that takes changes to the code from the upstream.

### Git Basics: Commands

- `git init` -> initialize the git repository
- The `.git` folder -> a local database
- `git log` -> history of the repository
- `git status` -> for checking, what the status of repository
- `git add` -> it tells Git, to start tracking this file in local index.
- `git commit` -> it take a snapshot of all added content at this point.
- `git diff`

#### Clone a Repository

- `git clone` -> create copies of Git repositories to work on.
- `git reset` -> returns to a previous or known state.

### Tags

- same as branches, except they do not have history.
- they points to a particular commit, but it doesn't change { unless, you force to change, or delete it}.

### Merging

- opposite of branching, take two separate points in your development tree and fuse them together.

**1. Pre-merge**
**2. Post Merge**

- `git merge <branch_name>`

#### Handling Merge Conflicts
