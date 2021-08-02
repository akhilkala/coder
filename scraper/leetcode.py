from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
# from selenium.webdriver.chrome.options import Options

# chrome_options = Options()
# chrome_options.add_argument("--headless")
# driver = webdriver.Chrome(options=chrome_options)

driver = webdriver.Chrome(ChromeDriverManager().install())

driver.get('https://leetcode.com/tag/bucket-sort/')

driver.quit()