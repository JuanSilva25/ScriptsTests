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

class TestCasodeprueba431():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_casodeprueba431(self):
    self.driver.get("http://localhost:1111/admin/settings/discounts")
    self.driver.set_window_size(968, 720)
    self.driver.find_element(By.LINK_TEXT, "New Discount").click()
    self.driver.find_element(By.ID, "discountCode").click()
    self.driver.find_element(By.ID, "discountCode").send_keys("code2024")
    self.driver.find_element(By.ID, "discountNewForm").click()
    self.driver.find_element(By.ID, "discountType").click()
    self.driver.find_element(By.ID, "discountType").click()
    self.driver.find_element(By.ID, "discountValue").click()
    self.driver.find_element(By.ID, "discountValue").send_keys("20")
    element = self.driver.find_element(By.ID, "discountStart")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).click_and_hold().perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "tr:nth-child(4) > .current-month:nth-child(1) > div")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).release().perform()
    self.driver.find_element(By.CSS_SELECTOR, ".admin").click()
    self.driver.find_element(By.CSS_SELECTOR, "tr:nth-child(3) > .current-month:nth-child(5) > div").click()
    self.driver.find_element(By.CSS_SELECTOR, ".gj-modal:nth-child(19) .btn:nth-child(2)").click()
    element = self.driver.find_element(By.ID, "discountEnd")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).click_and_hold().perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".gj-modal:nth-child(20)")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).release().perform()
    self.driver.find_element(By.CSS_SELECTOR, ".admin").click()
    self.driver.find_element(By.CSS_SELECTOR, ".gj-modal:nth-child(20) .modal-footer").click()
    self.driver.find_element(By.CSS_SELECTOR, "tr:nth-child(4) > .current-month:nth-child(1) > div").click()
    self.driver.find_element(By.CSS_SELECTOR, ".gj-modal:nth-child(20) .btn:nth-child(2)").click()
    self.driver.find_element(By.CSS_SELECTOR, ".btn-outline-success:nth-child(1)").click()
    self.driver.find_element(By.ID, "notify_message").click()
  
