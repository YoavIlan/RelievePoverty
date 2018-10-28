import unittest
from news_api import find_articles_for_state
from unittest.mock import patch, Mock

class BasicTests(unittest.TestCase):
    # ... other tests
    def test_mock_whole_function(self):
        """Mocking a whole function"""
        mock_get_patcher = patch('requests.get')
        data = { "articles":
            [{
                "author":	"24/7 Wall St",
                "id":	1,
                "image":	"https://amp.businessinsider.com/images/5babbfef39ce1ace748b4568-2732-1366.jpg",
                "published_date":	"Thu, 27 Sep 2018 14:45:26 GMT",
                "source":	"247wallst.com",
                "state":	"Alabama",
                "summary":	"Brian Stansberry/Wikimedia Commons/CC BY 4.0 Currently, close to 50 million Americans live below the official poverty income of $25,100 a year, or less, for a family of four. Poverty is the most extreme example of financial hardship, but the official pove",
                "title":	"50 million Americans live below the official poverty income here are the poorest towns in every US state",
                "url"	:"https://247wallst.com/special-report/2018/05/02/poorest-town-in-every-state-3/"
            }]
            }
        result = [{
            "author":	"24/7 Wall St",
            "id":	1,
            "image":	"https://amp.businessinsider.com/images/5babbfef39ce1ace748b4568-2732-1366.jpg",
            "published_date":	"Thu, 27 Sep 2018 14:45:26 GMT",
            "source":	"247wallst.com",
            "state":	"Alabama",
            "summary":	"Brian Stansberry/Wikimedia Commons/CC BY 4.0 Currently, close to 50 million Americans live below the official poverty income of $25,100 a year, or less, for a family of four. Poverty is the most extreme example of financial hardship, but the official pove",
            "title":	"50 million Americans live below the official poverty income here are the poorest towns in every US state",
            "url"	:"https://247wallst.com/special-report/2018/05/02/poorest-town-in-every-state-3/"
        }]
        # Start patching 'requests.get'.
        mock_get = mock_get_patcher.start()

        # Configure the mock to return a response with status code 200 and a list of users.
        mock_get.return_value = Mock(status_code = 200)
        mock_get.return_value.json.return_value = data

        # Call the service, which will send a request to the server.
        response = find_articles_for_state("Texas")

        # Stop patching 'requests'.
        mock_get_patcher.stop()

        # Assert that the request-response cycle completed successfully.
        #self.assertEqual(response.status_code, 200)
        self.assertEqual(response, result)


if __name__ == "__main__":
    unittest.main()
