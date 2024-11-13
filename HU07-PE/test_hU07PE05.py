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

class TestHU07PE05():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_hU07PE05(self):
    self.driver.get("http://localhost:1111/admin/login")
    self.driver.set_window_size(1552, 832)
    self.driver.find_element(By.ID, "loginForm").click()
    self.driver.find_element(By.LINK_TEXT, "Menu").click()
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-2 > .col-sm-2").click()
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-2 > .col-sm-2 > .form-control").send_keys("EstaEsLaSecciónParaPoderProbarAccesoriosComoCadenasRelojesYDemásQueTePuedenInteresar")
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-2 > .col-sm-6 > .form-control").click()
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-2 > .col-sm-6 > .form-control").send_keys("https://www.exito.com/moda-y-accesorios/moda-mujer/ropa-mujer")
    self.driver.find_element(By.CSS_SELECTOR, "#menuId-2 #settings-menu-update").click()
    assert self.driver.find_element(By.ID, "notify_message").text == "Error: El campo Menu excede el límite de caracteres."
  
