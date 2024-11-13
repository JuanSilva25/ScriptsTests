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

class TestCasodeprueba2938():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_casodeprueba2938(self):
    self.driver.get("http://localhost:1111/admin/user/new")
    self.driver.set_window_size(789, 816)
    self.driver.find_element(By.ID, "usersName").click()
    self.driver.find_element(By.ID, "usersName").send_keys("Juan Silva")
    self.driver.find_element(By.ID, "userEmail").send_keys("juan@gmailcom")
    self.driver.find_element(By.ID, "userPassword").click()
    self.driver.find_element(By.ID, "userPassword").send_keys("123")
    self.driver.find_element(By.ID, "btnUserAdd").click()
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".has-error > .form-control")
    assert len(elements) > 0
    self.driver.close()
  
