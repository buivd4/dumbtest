# dumbtest repo
## What is this?
Well, this is a preparation for a programming competition.
You can find the resources at the corresponding branches:
* `develop`: Automation testing tool for static HTML page
* `prepare`: Some PRE-WRITING for the competition
* `competition_itself`: Once the competition finish, we can find its solution here


## How to use the tool

1. Install by `pip install .`
2. Put your scripts to `iterators/` directory
3. Put target html project to web folder
4. Start server by typing `python lazytest/main.py start-server`
5. Start the test (all test will be run) by typing `python lazytest/main.py execute-test --target <route-to-your-html-file>`. For example: `python lazytest/main.py execute-test --target another-example.html`


See more by typing `lazytest -h`
```bash
usage: lazytest [-h] [-v] {start-server,execute-test,fuzzy} ...

Lazytest...

optional arguments:
  -h, --help            show this help message and exit
  -v, --verbose

subcommands:
  {start-server,execute-test,fuzzy}
    start-server        Start the web server feature
    execute-test        Execute the test feature
    fuzzy               Use the fuzzy feature
```