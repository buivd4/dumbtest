
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
        driver.get("https://lambdatest.github.io/sample-todo-app/")

        # Click on check box
        check_box_one = driver.find_element(By.NAME, "li1")
        check_box_one.click()

        # Click on check box
        check_box_two = driver.find_element(By.NAME,"li2")
        check_box_two.click()

        # Enter item in textfield
        textfield = driver.find_element(By.ID, "sampletodotext")
        textfield.send_keys("Yey, Let's add it to list")

        # Click on add button
        add_button = driver.find_element(By.ID,"addbutton")
        add_button.click()

        # Verified added item
        added_item = driver.find_element(By.XPATH,
            "//span[@class='done-false']").text
        print(added_item)

 
    # cleanup method called after every test performed
    def tearDown(self):
        self.driver.close()
 
# execute the script
if __name__ == "__main__":
    unittest.main()