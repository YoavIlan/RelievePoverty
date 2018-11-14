import sys
sys.path.append('../../')

import unittest
import flask_sqlalchemy
from backend.states_api import add_state_information
from unittest.mock import patch, Mock
import mock
from io import StringIO
import pprint

class StatesApiTests(unittest.TestCase):

    # @Evan@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_add_state_information(self, mock_stdout):
      with patch("flask_sqlalchemy.SQLAlchemy") as mock:
        mock_find_patcher = patch('backend.states_api.add_state_information')
        mock_find = mock_find_patcher.start()
        mock_find.return_value = None
        add_state_information()
        mock_find_patcher.stop()
        self.assertEqual(mock_stdout.getvalue().count('STATE'), 50)

    # @Albert@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_add_state_information2(self, mock_stdout):
      with patch("flask_sqlalchemy.SQLAlchemy") as mock:
        mock_find_patcher = patch('backend.states_api.add_state_information')
        mock_find = mock_find_patcher.start()
        mock_find.return_value = None
        add_state_information()
        mock_find_patcher.stop()
        self.assertEqual(mock_stdout.getvalue().count('TEXAS'), 0)

    # @Albert@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_add_state_information3(self, mock_stdout):
      with patch("flask_sqlalchemy.SQLAlchemy") as mock:
        mock_find_patcher = patch('backend.states_api.add_state_information')
        mock_find = mock_find_patcher.start()
        mock_find.return_value = None
        add_state_information()
        mock_find_patcher.stop()
        string = mock_stdout.getvalue()

        self.assertNotEqual(mock_stdout.getvalue(), 0)

    # @Albert@
    @unittest.mock.patch('sys.stdout', new_callable=StringIO)
    def test_add_state_information4(self, mock_stdout):
      with patch("flask_sqlalchemy.SQLAlchemy") as mock:
        mock_find_patcher = patch('backend.states_api.add_state_information')
        mock_find = mock_find_patcher.start()
        mock_find.return_value = None
        add_state_information()
        mock_find_patcher.stop()
        string = mock_stdout.getvalue()

        self.assertEqual(string[0:5], "{'NAM")

if __name__ == "__main__":
    unittest.main()
