import sys
sys.path.append('../../')

import unittest
import flask_sqlalchemy
from backend.news_api import find_articles_for_state, add_states_to_table
from unittest.mock import patch, Mock
import mock
from io import StringIO
import pprint

class NewsApiTests(unittest.TestCase):

    # @Daniel@
    def test_find_articles_for_states(self):
        """Mocking requests.get() to simulate API call"""
        mock_get_patcher = patch('requests.get')
        response = {"data": [{
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

        output = [{
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

        # Configure the mock to return a response with status code 200 and sample json
        mock_get.return_value = Mock(status_code = 200)
        mock_get.return_value.json.return_value = response

        # Call the service, which will send a request to the server.
        result = find_articles_for_state("Texas")

        # Stop patching 'requests'.
        mock_get_patcher.stop()

        self.assertEqual(result, output)

    # @Daniel@
    def test_bad_request(self):
        """Mocking requests.get() to simulate API call"""
        mock_get_patcher = patch('requests.get')

        # Start patching 'requests.get'.
        mock_get = mock_get_patcher.start()

        # Configure the mock to return a response with status code 503
        mock_get.return_value = Mock(status_code = 503)
        mock_get.return_value.json.return_value = "Error 503"

        # Call the service, which will send a request to the server.
        result = find_articles_for_state("Texas")

        # Stop patching 'requests'.
        mock_get_patcher.stop()

        self.assertEqual(result, None)

    # @Daniel@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_add_states_to_table(self, mock_stdout):
        with patch("flask_sqlalchemy.SQLAlchemy") as mock:
            """Mocking find_articles_for_state to give sample json as output"""
            mock_find_patcher = patch('backend.news_api.find_articles_for_state')
            mock_find = mock_find_patcher.start()
            mock_find.return_value = [{
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

            expected_output = ''
            for i in range(0,50):
                expected_output += pprint.pformat(mock_find.return_value[0]) + "\n"


            # Should process sample json for all 50 states
            add_states_to_table()

            mock_find_patcher.stop()

            self.assertEqual(mock_stdout.getvalue(), expected_output)

    # @Daniel@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_add_states_to_table_bad_request(self, mock_stdout):
        with patch("flask_sqlalchemy.SQLAlchemy") as mock:
            """Mocking find_articles_for_state to give None as output"""
            mock_find_patcher = patch('backend.news_api.find_articles_for_state')
            mock_find = mock_find_patcher.start()
            mock_find.return_value = None

            expected_output = ""
            for i in range(0,50):
                expected_output += "Could not get data from endpoint\n"

            # Call the function which should not get any data
            add_states_to_table()

            mock_find_patcher.stop()

            self.assertEqual(mock_stdout.getvalue(), expected_output)


if __name__ == "__main__":
    unittest.main()
