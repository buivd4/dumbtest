from selenium.webdriver.common.by import By
import time

from lazytest.classes.AbstractFuzzingGenerator import AbstractFuzzingGenerator
from lazytest.classes.AbstractFuzzingInput import AbstractFuzzingInput

class ExampleSetStyle(AbstractFuzzingInput):
    _regex_=r'(red|green|blue|yellow)'
    execution_time=10
    def get(self, driver):
        self.logger.info("Getting rectangle style")
        elem=driver.find_element(By.ID,'rectangle')
        return elem.value_of_css_property("backgroundColor")
    def set(self, value, driver):
        self.logger.info(f"Setting rectangle style -> {value}")
        elem=driver.find_element(By.ID,'rectangle')
        driver.execute_script(f"arguments[0].style.backgroundColor = '{value}';", elem)

class FuzzingExample(AbstractFuzzingGenerator):
    _input_={
        "retangle": ExampleSetStyle(),
    }
    def before_rset(self):
        time.sleep(5)

    def after_rset(self):
        time.sleep(5)
        self.logger.info(self._input_["retangle"].get(self.driver))
