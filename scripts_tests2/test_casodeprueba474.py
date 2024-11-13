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

class TestCasodeprueba424():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_casodeprueba424(self):
    self.driver.get("http://localhost:1111/admin/settings/pages/")
    self.driver.set_window_size(945, 1020)
    self.driver.find_element(By.LINK_TEXT, "New page").click()
    self.driver.find_element(By.ID, "pageName").click()
    self.driver.find_element(By.ID, "pageName").send_keys("\"kwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojnkwdnwdojn\"")
    self.driver.find_element(By.ID, "pageSlug").click()
    self.driver.find_element(By.ID, "pageSlug").send_keys("lmao")
    self.driver.find_element(By.CSS_SELECTOR, ".checkbox:nth-child(2)").click()
    self.driver.find_element(By.ID, "pageEnabled").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".note-btn-bold")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".btn-fullscreen")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    self.driver.find_element(By.CSS_SELECTOR, ".note-editable").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".note-table .note-btn")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, ".note-editable")
    self.driver.execute_script("if(arguments[0].contentEditable === 'true') {arguments[0].innerText = '<p>\"Texto Valido\"</p>'}", element)
    self.driver.find_element(By.ID, "btnPageUpdate").click()
    element = self.driver.find_element(By.CSS_SELECTOR, ".note-btn-group:nth-child(3) > .dropdown-toggle")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    assert self.driver.find_element(By.ID, "notify_message").text == "Error!"
  
