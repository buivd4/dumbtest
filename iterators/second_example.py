import time
import logging
from lazytest.classes.AbstractTestIterator import AbstractTestIterator
from selenium.webdriver.common.by import By

class SecondTestIterator(AbstractTestIterator):
    __describe__="Version 2: This test is for something, some purpose..."

    def exec(self):

        # Wait for a few seconds to let the page load
        time.sleep(2)

        self.logger.info("find element")
        elem=self.driver.find_element(By.ID,'rectangle')
        self.driver.execute_script("arguments[0].style.backgroundColor = 'yellow';", elem)
        time.sleep(2)
        self.driver.execute_script("arguments[0].style.backgroundColor = 'pink';", elem)

        # Close the browser window
        self.driver.close()
