import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class PythonOrgSearch(unittest.TestCase):
    base_url = "https://www.relievepoverty.me"
    news_url = "https://relievepoverty.me/news"
    states_url = "https://relievepoverty.me/states"
    charities_url = "https://relievepoverty.me/charities"
    about_url = "https://relievepoverty.me/about"

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=r'/usr/local/bin/chromedriver')

    def test_title_in_splash(self):
        self.driver.get(self.base_url)
        self.assertIn("Relieve Poverty", self.driver.title)
    
    def test_carousel_in_splash(self):
        self.driver.get(self.base_url)
        carousel = self.driver.find_element_by_class_name("carousel")
        self.assertIsNotNone(carousel)
    
    def test_navbar_in_splash(self):
        self.driver.get(self.base_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)

    def test_jumbotron_in_splash(self):
        self.driver.get(self.base_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)

    def test_navbar_in_news(self):
        self.driver.get(self.news_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)

    def test_jumbotron_in_news(self):
        self.driver.get(self.news_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)

    def test_navbar_in_states(self):
        self.driver.get(self.states_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)

    def test_jumbotron_in_states(self):
        self.driver.get(self.states_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)

    def test_navbar_in_charities(self):
        self.driver.get(self.charities_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)

    def test_jumbotron_in_charities(self):
        self.driver.get(self.charities_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)
        
    def test_navbar_in_about(self):
        self.driver.get(self.about_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)

    def test_jumbotron_in_about(self):
        self.driver.get(self.about_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)
    
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()