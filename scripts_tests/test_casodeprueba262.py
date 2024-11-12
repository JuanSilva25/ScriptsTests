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

class TestCasodeprueba262():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_casodeprueba262(self):
    self.driver.get("http://localhost:1111/admin/orders")
    self.driver.set_window_size(968, 720)
    self.driver.find_element(By.ID, "order_filter").click()
    self.driver.find_element(By.ID, "order_filter").send_keys("juan@gmail.com")
    self.driver.find_element(By.ID, "btn_order_filter").click()
    self.driver.find_element(By.CSS_SELECTOR, ".text-center").click()
    assert self.driver.find_element(By.CSS_SELECTOR, ".text-center").text == "No orders found"
    self.driver.find_element(By.CSS_SELECTOR, ".text-center").click()
  
