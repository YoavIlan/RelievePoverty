import requests
import pprint
import flask
import flask_sqlalchemy
import flask_restless

url = "https://newsapi.org/v2/everything"
parameters = {"apikey": "b386d62df19440c3956c013c8138f62a", "pageSize":100}
states = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

def find_articles_for_state(state):
    parameters['q'] = 'poverty' + '&' + state
    response = requests.get(url, params=parameters)
    articles = [article for article in response.json()['articles']]
    return articles

def add_states_to_table():
    for state in states:
        articles = find_articles_for_state(state)
        for article in articles:
            # TODO: Create a new row for an article on the News table
            # curr_article = News()
            pass

if __name__ == "__main__":
    add_states_to_table()
