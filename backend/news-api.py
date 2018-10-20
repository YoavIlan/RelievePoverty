import requests
import pprint
import flask
import flask_sqlalchemy
import flask_restless


# http://127.0.0.1:5000/api/v1/news

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://relievepoverty:SWEpoverty6@relievepoverty.cdbjmfurziio.us-east-2.rds.amazonaws.com/RelievePovertyDB'
db = flask_sqlalchemy.SQLAlchemy(app)


class News(db.Model):
    title = db.Column(db.String(255))
    summary = db.Column(db.String(255))
    source = db.Column(db.String(255))
    state = db.Column(db.String(255))
    author = db.Column(db.String(255))
    published_date = db.Column(db.DateTime)
    url = db.Column(db.String(255))
    image = db.Column(db.String(255))
    id = db.Column(db.Integer, primary_key=True)

# Create the database tables.
db.create_all()

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
            pprint.pprint(article)
            curr_article = News(title=article['title'], summary=article['description'], source=article['source']['name'], state=state, author=article['author'], published_date=article['publishedAt'], url=article['url'], image=article['urlToImage'])
            db.session.add(curr_article)            
        db.session.commit()

if __name__ == "__main__":
    add_states_to_table()
