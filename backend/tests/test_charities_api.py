import sys
sys.path.append('../../')

import unittest
import flask_sqlalchemy
from backend.charity_api import build_address, get_charities_by_query, get_charities_by_category
from unittest.mock import patch, Mock
import mock
from io import StringIO
import pprint

class CharitiesApiTests(unittest.TestCase):

    # @Daniel@
    def test_build_address(self):
        address = {
        "streetAddress1": "streetAddress1",
        "streetAddress2": "streetAddress2",
        "city": "city",
        "stateOrProvince": "stateOrProvince",
        "postalCode": "postalCode"
        }
        expected_output = "streetAddress1\nstreetAddress2\ncity, stateOrProvince postalCode"

        self.assertEqual(build_address(address), expected_output)

    # @Daniel@
    def test_build_address_missing_field(self):
        address = {
        "streetAddress1": "streetAddress1",
        "city": "city",
        "stateOrProvince": "stateOrProvince",
        "postalCode": "postalCode"
        }
        expected_output = "streetAddress1\ncity, stateOrProvince postalCode"

        self.assertEqual(build_address(address), expected_output)

    # @Daniel@
    def test_build_address_none_input(self):
        self.assertEqual(build_address(None), "No Address Available")


    # @Daniel@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_get_charities_by_query(self, mock_stdout):
        with patch("flask_sqlalchemy.SQLAlchemy") as mock:
            """Mocking requests.get() for sample API call"""
            mock_get_patcher = patch('requests.get')
            mock_get = mock_get_patcher.start()
            mock_get.return_value = Mock(status_code = 200)
            mock_get.return_value.json.return_value = [
              {
                "charityNavigatorURL": "https://www.charitynavigator.org/?bay=search.summary&orgid=5954&utm_source=DataAPI&utm_content=b16336bb",
                "mission": "The MDI Biological Laboratory is a rapidly growing, independent non-profit biomedical research institution. Its mission is to improve human health and well-being through basic research, education, and development ventures that transform discoveries into cures.",
                "websiteURL": "http://www.mdibl.org/",
                "tagLine": "Connecting Science, Environment, and Health",
                "charityName": "Mount Desert Island Biological Laboratory",
                "ein": "010202467",
                "orgID": 5954,
                "currentRating": {
                  "score": 94.62,
                  "ratingID": 122841,
                  "publicationDate": "2017-07-01T04:00:00.000Z",
                  "ratingImage": {
                    "small": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4starsb.png",
                    "large": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4stars.png"
                  },
                  "rating": 4,
                  "financialRating": {
                    "score": 93.54,
                    "rating": 4
                  },
                  "accountabilityRating": {
                    "score": 96,
                    "rating": 4
                  }
                },
                "category": {
                  "categoryName": "Research and Public Policy",
                  "categoryID": 11,
                  "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.categories&categoryid=11&utm_source=DataAPI&utm_content=b16336bb",
                  "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/categories/research.png"
                },
                "cause": {
                  "causeID": 35,
                  "causeName": "Non-Medical Science & Technology Research",
                  "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.results&cgid=11&cuid=35&utm_source=DataAPI&utm_content=b16336bb",
                  "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/causes/small/nonmedical.jpg"
                },
                "irsClassification": {
                  "deductibility": "Contributions are deductible",
                  "subsection": "501(c)(3)",
                  "nteeType": "Science and Technology Research Institutes, Services",
                  "foundationStatus": "Organization that normally receives no more than one-third of its support from gross investment income and unrelated business income and at the same time more than one-third of its support from contributions, fees, and gross receipts related to exempt purposes.  509(a)(2)",
                  "nteeSuffix": "0",
                  "nteeClassification": "Biological, Life Science Research",
                  "deductibilityDetail": None,
                  "nteeCode": "U50",
                  "nteeLetter": "U",
                  "affiliation": "Independent"
                },
                "mailingAddress": {
                  "country": None,
                  "stateOrProvince": "ME",
                  "city": "Bar Harbor",
                  "postalCode": "04609",
                  "streetAddress1": "159 Old Bar Harbor Road",
                  "streetAddress2": None
                },
                "donationAddress": {
                  "country": None,
                  "stateOrProvince": "ME",
                  "city": "Salisbury Cove",
                  "postalCode": "04672",
                  "streetAddress1": "PO Box 35",
                  "streetAddress2": None
                },
                "advisories": {
                  "severity": None,
                  "active": {
                    "_rapid_links": {
                      "related": {
                        "href": "https://api.data.charitynavigator.org/v2/Organizations/010202467/Advisories?status=ACTIVE"
                      }
                    }
                  }
                }
            }]

            expected_output = "Mount Desert Island Biological Laboratory\n"


            # Call the function which should not get any data
            get_charities_by_query("test")

            mock_get_patcher.stop()

            self.assertEqual(mock_stdout.getvalue(), expected_output)

    # @Daniel@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_get_charities_by_query_bad_response(self, mock_stdout):
        with patch("flask_sqlalchemy.SQLAlchemy") as mock:
            """Mocking requests.get() for sample API call"""
            mock_get_patcher = patch('requests.get')
            mock_get = mock_get_patcher.start()
            mock_get.return_value = Mock(status_code = 503)

            # Call the function which should not get any data
            get_charities_by_query("test")

            mock_get_patcher.stop()

            self.assertEqual(mock_stdout.getvalue(), "Could not reach endpoint\n")

    # @Daniel@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_get_charities_by_category(self, mock_stdout):
        with patch("flask_sqlalchemy.SQLAlchemy") as mock:
            """Mocking requests.get() for sample API call"""
            mock_get_patcher = patch('requests.get')
            mock_get = mock_get_patcher.start()
            mock_get.return_value = Mock(status_code = 200)
            mock_get.return_value.json.return_value = [
              {
                "charityNavigatorURL": "https://www.charitynavigator.org/?bay=search.summary&orgid=5954&utm_source=DataAPI&utm_content=b16336bb",
                "mission": "The MDI Biological Laboratory is a rapidly growing, independent non-profit biomedical research institution. Its mission is to improve human health and well-being through basic research, education, and development ventures that transform discoveries into cures.",
                "websiteURL": "http://www.mdibl.org/",
                "tagLine": "Connecting Science, Environment, and Health",
                "charityName": "Mount Desert Island Biological Laboratory",
                "ein": "010202467",
                "orgID": 5954,
                "currentRating": {
                  "score": 94.62,
                  "ratingID": 122841,
                  "publicationDate": "2017-07-01T04:00:00.000Z",
                  "ratingImage": {
                    "small": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4starsb.png",
                    "large": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/stars/4stars.png"
                  },
                  "rating": 4,
                  "financialRating": {
                    "score": 93.54,
                    "rating": 4
                  },
                  "accountabilityRating": {
                    "score": 96,
                    "rating": 4
                  }
                },
                "category": {
                  "categoryName": "Research and Public Policy",
                  "categoryID": 6,
                  "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.categories&categoryid=11&utm_source=DataAPI&utm_content=b16336bb",
                  "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/icons/categories/research.png"
                },
                "cause": {
                  "causeID": 35,
                  "causeName": "Non-Medical Science & Technology Research",
                  "charityNavigatorURL": "https://www.charitynavigator.org/index.cfm?bay=search.results&cgid=11&cuid=35&utm_source=DataAPI&utm_content=b16336bb",
                  "image": "https://d20umu42aunjpx.cloudfront.net/_gfx_/causes/small/nonmedical.jpg"
                },
                "irsClassification": {
                  "deductibility": "Contributions are deductible",
                  "subsection": "501(c)(3)",
                  "nteeType": "Science and Technology Research Institutes, Services",
                  "foundationStatus": "Organization that normally receives no more than one-third of its support from gross investment income and unrelated business income and at the same time more than one-third of its support from contributions, fees, and gross receipts related to exempt purposes.  509(a)(2)",
                  "nteeSuffix": "0",
                  "nteeClassification": "Biological, Life Science Research",
                  "deductibilityDetail": None,
                  "nteeCode": "U50",
                  "nteeLetter": "U",
                  "affiliation": "Independent"
                },
                "mailingAddress": {
                  "country": None,
                  "stateOrProvince": "ME",
                  "city": "Bar Harbor",
                  "postalCode": "04609",
                  "streetAddress1": "159 Old Bar Harbor Road",
                  "streetAddress2": None
                },
                "donationAddress": {
                  "country": None,
                  "stateOrProvince": "ME",
                  "city": "Salisbury Cove",
                  "postalCode": "04672",
                  "streetAddress1": "PO Box 35",
                  "streetAddress2": None
                },
                "advisories": {
                  "severity": None,
                  "active": {
                    "_rapid_links": {
                      "related": {
                        "href": "https://api.data.charitynavigator.org/v2/Organizations/010202467/Advisories?status=ACTIVE"
                      }
                    }
                  }
                }
            }]

            expected_output = "Mount Desert Island Biological Laboratory\n"


            # Call the function which should not get any data
            get_charities_by_category()

            mock_get_patcher.stop()

            self.assertEqual(mock_stdout.getvalue(), expected_output)

    # @Daniel@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_get_charities_by_category_bad_response(self, mock_stdout):
        with patch("flask_sqlalchemy.SQLAlchemy") as mock:
            """Mocking requests.get() for sample API call"""
            mock_get_patcher = patch('requests.get')
            mock_get = mock_get_patcher.start()
            mock_get.return_value = Mock(status_code = 503)

            # Call the function which should not get any data
            get_charities_by_category()

            mock_get_patcher.stop()

            self.assertEqual(mock_stdout.getvalue(), "Could not reach endpoint\n")

if __name__ == "__main__":
    unittest.main()
