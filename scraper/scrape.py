from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time
import json
import os
import sys


class Scraper:
    def __init__(self):
        self.driver = webdriver.Chrome(ChromeDriverManager().install())
        self.URLs = {
            "hackerrank":"https://www.hackerrank.com/domains/algorithms",
            "leetcode":"https://leetcode.com/problemset/all/",
        }
        self.data_location = os.path.join(os.getcwd(),"problems")
    
    def scrape_leetcode(self):
        self.driver.get(self.URLs['leetcode'])
        links = [ a.get_attribute('href') for a in self.driver.find_elements_by_css_selector('div.group a.inline-flex.items-center')]
        # TODO: ***fix not getting data sometimes

        entries =set()
        for link in links:
            self.driver.get(link)
            time.sleep(10)
            elements = [ div.find_element_by_tag_name('a') for div in self.driver.find_elements_by_css_selector('.title-cell__ZGos')]

            for ele in elements:
                entries.add(json.dumps({
                    'name':ele.get_attribute("innerText"),
                    'link':ele.get_attribute('href'),
                }))

        
        
        entries = list(map(lambda x:json.loads(x), entries))

        self.write_to_file('leetcode',entries)
        self.close_driver()

    def close_driver(self):
        self.driver.quit()
        print("Browser closed")
        sys.exit()
    
    def write_to_file(self,name,obj):
        jsonString = json.dumps(obj)
        with open(self.data_location + "/" + name + ".json", "w") as file:
            file.write(jsonString)
            file.close()
    

# test = Scraper()
# test.scrape_leetcode()


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

