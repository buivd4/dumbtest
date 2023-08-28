from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def get_webdriver(chrome_binary_loc='/Users/jungleboi/Projects/dumbtest/dependencies/chromedriver_mac64/chromedriver'):
    option = Options()
    option.binary_location=chrome_binary_loc
    return webdriver.Chrome()