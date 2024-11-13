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

class TestCasodeprueba092():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_casodeprueba092(self):
    self.driver.get("http://localhost:1111/admin/settings/menu")
    self.driver.set_window_size(945, 1020)
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-0 > .col-sm-2 > .form-control").click()
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-0 > .col-sm-2 > .form-control").send_keys("Hombre")
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-0 > .col-sm-6 > .form-control").click()
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-0 > .col-sm-6 > .form-control").click()
    element = self.driver.find_element(By.CSS_SELECTOR, "#menuId-0 > .col-sm-6 > .form-control")
    actions = ActionChains(self.driver)
    actions.double_click(element).perform()
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-0 > .col-sm-6 > .form-control").click()
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-0 > .col-sm-6 > .form-control").send_keys("Hombre")
    self.driver.find_element(By.ID, "settings-menu-update").click()
    assert self.driver.find_element(By.ID, "notify_message").text == "Menu updated successfully."
  
