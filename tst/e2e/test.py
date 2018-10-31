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

    ## @Uriel@
    def test_title_in_splash(self):
        self.driver.get(self.base_url)
        self.assertIn("Relieve Poverty", self.driver.title)

    ## @Uriel@   
    def test_carousel_in_splash(self):
        self.driver.get(self.base_url)
        carousel = self.driver.find_element_by_class_name("carousel")
        self.assertIsNotNone(carousel)
    
    ## @Uriel@
    def test_navbar_in_splash(self):
        self.driver.get(self.base_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)
    
    ## @Uriel@
    def test_jumbotron_in_splash(self):
        self.driver.get(self.base_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)
    
    ## @Uriel@
    def test_navbar_in_news(self):
        self.driver.get(self.news_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)
    
    ## @Uriel@
    def test_jumbotron_in_news(self):
        self.driver.get(self.news_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)
    
    ## @Uriel@
    def test_navbar_in_states(self):
        self.driver.get(self.states_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)
    
    ## @Uriel@
    def test_jumbotron_in_states(self):
        self.driver.get(self.states_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)
    
    ## @Uriel@
    def test_navbar_in_charities(self):
        self.driver.get(self.charities_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)
    
    ## @Uriel@
    def test_jumbotron_in_charities(self):
        self.driver.get(self.charities_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)
    
    ## @Uriel@    
    def test_navbar_in_about(self):
        self.driver.get(self.about_url)
        navbar = self.driver.find_element_by_class_name("navbar")
        self.assertIsNotNone(navbar)
    
    ## @Uriel@
    def test_jumbotron_in_about(self):
        self.driver.get(self.about_url)
        jumbotron = self.driver.find_element_by_class_name("jumbotron")
        self.assertIsNotNone(jumbotron)
    
    ## @Uriel@
    def test_about_cards_have_img(self):
        self.driver.get(self.about_url)
        image = self.driver.find_element_by_id("developer-img")
        self.assertIsNotNone(image)
    
    ## @Uriel@
    def test_can_nav_to_news(self):
        self.driver.get(self.base_url)
        news = self.driver.find_element_by_link_text("News")
        news.click()
        url = self.driver.current_url
        self.assertEquals("news", url[-4:])

    ## @Uriel@
    def test_can_nav_to_states(self):
        self.driver.get(self.base_url)
        states = self.driver.find_element_by_link_text("States")
        states.click()
        url = self.driver.current_url
        self.assertEquals("states", url[-6:])

    ## @Uriel@
    def test_can_nav_to_charities(self):
        self.driver.get(self.base_url)
        charities = self.driver.find_element_by_link_text("Charities")
        charities.click()
        url = self.driver.current_url
        self.assertEquals("charities", url[-9:])

    ## @Uriel@
    def test_can_nav_to_about(self):
        self.driver.get(self.base_url)
        about = self.driver.find_element_by_link_text("About")
        about.click()
        url = self.driver.current_url
        self.assertEquals("about", url[-5:])
    

    
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()