import rstr, re
import logging
class AbstractFuzzingInput:
    _regex_=""
    def __init__(self) -> None:
        self.logger=logging.getLogger(f"lazytest:{self.__class__.__name__}")

    def randomize(self):
        return rstr.xeger(self._regex_)
    
    def get(self, driver):
        raise NotImplementedError()

    def set(self, value, driver):
        raise NotImplementedError()
    
    def rset(self, driver):
        value = self.randomize()
        self.set(value, driver)

    def validate(self, driver):
        return re.match(self._regex_, self.get(driver))