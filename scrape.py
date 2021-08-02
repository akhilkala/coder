from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import time
import json

class Scraper:
    def __init__(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.URLs = {
            "hackerrank":"https://www.hackerrank.com/domains/algorithms",
            "leetcode":"https://leetcode.com/problemset/all/",
        }
        self.data_location = './problems'
    
    def scrape_leetcode(self):
        self.driver.get(self.URLs['leetcode'])
        links = [ a.get_attribute('href') for a in self.driver.find_elements_by_css_selector('div.group a.inline-flex.items-center')]
        
   
        self.write_to_file('test2',links)

        self.close_driver()

    def close_driver(self):
        self.driver.quit()
    
    def write_to_file(self,name,obj):
        jsonString = json.dumps(obj)
        file = open(self.data_location + "/" + name + ".json", "w")
        file.write(jsonString)
        file.close()

test = Scraper()
test.scrape_leetcode()
test.close_driver()

# driver.execute_script("window.scrollTo(0, 9999999999999999999999)")

#Check for duplicates before putting in list , can set be used in some way?

# elements = [ div.find_element_by_tag_name('a') for div in driver.find_elements_by_css_selector('.title-cell__ZGos')]
# print(element.get_attribute("innerText"))

# entries = []

# for ele in elements:
#     entries.append({
#         'name':ele.get_attribute("innerText"),
#         'link':ele.get_attribute('href'),
#     })

# jsonString = json.dumps(entries)
# jsonFile = open("./data/test.json", "w")
# jsonFile.write(jsonString)
# jsonFile.close()


# driver.quit()

# from selenium.webdriver.chrome.options import Options
# from selenium import webdriver
# from selenium.common.exceptions import TimeoutException
# from selenium.webdriver.support.wait import WebDriverWait
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support import expected_conditions as EC
 
#     def scroll_until_loaded(self):
#         check_height = self.browser.execute_script("return document.body.scrollHeight;")
#         while True:
#             self.browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
#             try:
#                 self.wait.until(lambda driver: self.browser.execute_script("return document.body.scrollHeight;") > check_height)
#                 check_height = self.browser.execute_script("return document.body.scrollHeight;")
#             except TimeoutException:
#                 break