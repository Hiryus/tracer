# Contributions

Merge requests are welcome.

* After cloning the repository, create a new branch named after your changes (ex: `fix-readme-proof-reading` or `feature-french-translation`).
  * Don't forget to update readme if applicable.
* Create a pull request with your changes.
* A maintainer will then accept the request and merge it into master (if everything looks good) or request some changes (nobody writes perfect code on the first attempt after all).
  Feel free to discuss the changes: the merge request feature was created for that !

NB: all contributors are expected to follow the [contributor covenant](https://www.contributor-covenant.org/version/1/4/code-of-conduct) Code of Conduct.
This readme also contain valuable information about the project structure and conventions, especially reguarding code style and tests.

PS: if you are usure how to do something, feel free to ask and discuss: pull requests are ideal for discussions and it is maintainers job to help and guide contributors.
In other words, it is better to try, fail and fix than to not do aything ;).


## Commit messages

All commit messages *on master* must respect the [conventional commits](https://www.conventionalcommits.org/) format:
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

This project uses mostly the following types (and the optional scope is usually not used):
* **feat**: A new feature increasing minor version (ex: `feat: add API endpoint xxx`).
* **fix**: A bug fix (ex: `fix: installation bug under OSX (issue #123)`).
* **doc**: Documentation only changes (ex: `docs: add documentation for signing commits`).
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) (ex: `style: fix linter warnings`).
* **refactor**: A code change chaging code structure (ex: `refactor: move API into its own folder with proper spec.`).
* **perf**: A code change that improves performance (ex: `perf: greatly improve tests speed using multi-threading`).
* **test**: Adding missing or correcting existing tests (ex: `test: add tests for the API`).
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation (ex: `chore: update dependencies`).
* **revert**: Revert of a previous commit (see below).
* **merge**: Merge of two branches (ex: `merge: dev into master`.

Description must be short and explain the commit changes. It should use present and avoid passive form when possible.

If the commit reverts a previous commit, it should begin with `revert:`, followed by the reverted commit type.  
In the description it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.  
A commit with this format is automatically created by the git revert command.


# Dependencies management

* Direct dependencies are defined in the file `package.json` (this file also defines the scripts and project description).
  All direct dependencies versions are **pinned** (their version is locked and installer won't try to install higher minor versions).
* The `package-lock.json` lists all dependencies, including dependencies of dependencies.
  It ensures the very same versions are installed on each computer if you use `npm ci` instead of `npm install`.
* Both files must be commited.


## Tests and code style

Tests are run with [jest](https://jestjs.io/).
You can run them with the `npm run test` command.

Code style is based on [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) but use an indentation of 4 spaces (instead of 2).
* You can check your style with the `npm run lint` command which is based on [eslint](https://eslint.org/) linter.
* Eslint also works with most IDE for instant feedback (configuration is stored in `.eslintrc` files).

One last detail (or two): use **UTF-8** encoding and **UNIX style** line endings (`LF` instead of `CRLF`).


## Branching model

* **Direct comits/pushes to master are prohibited**.
* All changes should be made on the `dev` branch or on a dedicated branch with an understandable name (ex: `feature-autoupdate` or `poc-renovate`).
* Changes can then be merged to master by creating a [pull request](https://help.github.com/en/articles/about-pull-requests).


# Coding rules

This project follows the following principles:
* [KISS](https://en.wikipedia.org/wiki/KISS_principle) - Keep It Simple,
* [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) - Don't Repeat Yourself,
* The repository architecture is inspired by [a successful git branching model](https://nvie.com/posts/a-successful-git-branching-model/) from Vincent Driessen.
