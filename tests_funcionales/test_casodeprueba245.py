# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestCasodeprueba245():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_casodeprueba245(self):
    self.driver.get("http://localhost:1111/product/jeans-para-hombre")
    self.driver.set_window_size(792, 816)
    element = self.driver.find_element(By.ID, "product_quantity")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).click_and_hold().perform()
    element = self.driver.find_element(By.ID, "product_quantity")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.ID, "product_quantity")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).release().perform()
    self.driver.find_element(By.ID, "product_quantity").click()
    self.driver.find_element(By.ID, "product_quantity").send_keys("9")
    self.driver.find_element(By.CSS_SELECTOR, ".col-md-6 > .row").click()
    self.driver.find_element(By.CSS_SELECTOR, ".btn-block").click()
    self.driver.find_element(By.ID, "notify_message").click()
    self.driver.close()
  
