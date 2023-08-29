import argparse
import logging

START_SERVER_COMMAND="start-server"
EXECUTE_TEST_COMMAND="run"

def args_validate(args):
    pass

def cli():
    parser = argparse.ArgumentParser(description="Lazytest...")
    parser.add_argument("-v","--verbose",action='store_true')
    subparsers = parser.add_subparsers(title="subcommands", dest="subcommand")

    start_web_parser = subparsers.add_parser(START_SERVER_COMMAND, help="Start the web server feature")
    start_web_parser.add_argument('--web-dir', type=str, default="web/", help="Web directory for the start-web feature")
    start_web_parser.add_argument('--port', type=int, default=8000, help="Port number for the start-web feature")

    execute_test_parser = subparsers.add_parser(EXECUTE_TEST_COMMAND, help="Execute the test feature")
    execute_test_parser.add_argument('-c','--chrome-driver-path', type=str, default="dependencies/chromedriver_mac64/chromedriver", help="Chrome driver path for test feature")
    execute_test_parser.add_argument('-p','--port', type=int, default=8000, help="Port number for test feature")
    execute_test_parser.add_argument('-t','--target', type=str, default="example.html", help="Target for test feature")
    execute_test_parser.add_argument('-d','--run-dir', type=str, default="iterators/", help="Path of script directory to execute")

    args = parser.parse_args()
    args_validate(args)
    if args.verbose:
        logging.basicConfig(level=logging.DEBUG)
    else:
        logging.basicConfig(level=logging.INFO)
    return args