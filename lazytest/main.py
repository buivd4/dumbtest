import logging
from lazytest.cli import cli, START_SERVER_COMMAND, EXECUTE_TEST_COMMAND
from lazytest.server import start_server
from lazytest.script_loader import load_iterators
from lazytest.webdriver import get_webdriver
# Set up logging
logger = logging.getLogger("lazytest")

def main():
    args=cli()
    if args.subcommand == START_SERVER_COMMAND:
        logger.info(f"Start web server at port `{args.port}`, from directory `{args.web_dir}`")
        start_server(args.port,args.web_dir)

    if args.subcommand == EXECUTE_TEST_COMMAND:
        iterators = load_iterators(args.run_dir)
        for iterator in iterators:
            try:
                for i in range(iterator.execution_time):
                    logger.info(f"Executing {iterator}({i})")
                    webdriver=get_webdriver()
                    iterator(webdriver, args.port, args.target).exec()
                    webdriver.close()
            except Exception as e:
                logger.error(e)
            

if __name__=="__main__":
    main()