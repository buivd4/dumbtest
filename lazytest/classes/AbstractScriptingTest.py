import logging
class AbstractScriptingTest:
    execution_time=1
    def __init__(self, driver, port, target) -> None:
        self.driver = driver
        self.driver.get(f"http://localhost:{port}/{target}")
        self.logger=logging.getLogger(f"lazytest:{self.__class__.__name__}")
    
    def exec(self):
        raise NotImplementedError()