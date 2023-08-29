import logging
class AbstractFuzzingGenerator:
    _input_=[]
    execution_time=1
    def __init__(self, driver, port, target) -> None:
        self.driver = driver
        self.driver.get(f"http://localhost:{port}/{target}")
        self.logger=logging.getLogger(f"lazytest:{self.__class__.__name__}")

    def after_rset(self):
        pass
    
    def before_rset(self):
        pass

    
    def exec(self):
        self.before_rset()
        for v in self._input_.values():
            v.rset(self.driver)
        self.after_rset()
        