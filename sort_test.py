
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import sys
 
# inherit TestCase Class and create a new test class
class PythonOrgAdd(unittest.TestCase):
 
    # initialization of webdriver
    def setUp(self):
        self.driver = webdriver.Chrome()
 
    # Test case method. It should always start with test_
    def test_unit_user_should_able_to_add_item(self):
        # try:
        driver = self.driver

        # Url
        driver.get("https://kitchen.applitools.com/ingredients/table")

        table = driver.find_element(By.ID, "fruits-vegetables")

        table.find_element(By.ID,"column-button-name").click()

        expectedTableValues = """Name\nType\nFlavor\nApple Fruit Sweet\nBanana Fruit Sweet\nCarrots Vegetable Sweet\nLemon Fruit Bitter\nOnion Vegetable Bitter\nPepper Vegetable Sweet"""

        self.assertEqual(expectedTableValues, table.text, "wrong sort")
 
    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()
 
# execute the script
if __name__ == "__main__":
    unittest.main()