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

class TestCasodeprueba2040():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_casodeprueba2040(self):
    self.driver.get("http://localhost:1111/admin/products")
    self.driver.set_window_size(789, 816)
    self.driver.find_element(By.CSS_SELECTOR, ".hidden-xs").click()
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".list-group-item:nth-child(2) > .top-pad-8")
    assert len(elements) > 0
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".list-group-item:nth-child(3) > .top-pad-8")
    assert len(elements) > 0
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".list-group-item:nth-child(4) > .top-pad-8")
    assert len(elements) > 0
    elements = self.driver.find_elements(By.CSS_SELECTOR, ".list-group-item:nth-child(5)")
    assert len(elements) > 0
    self.driver.close()
  
