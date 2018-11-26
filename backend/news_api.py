import requests
import pprint
import flask
import flask_sqlalchemy
import flask_restless
import random

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
app.config['DEBUG'] = False
app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://relievepoverty:SWEpoverty6@relievepoverty.cdbjmfurziio.us-east-2.rds.amazonaws.com/RelievePovertyDB'
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

# API for newsapi
url = "https://newsapi.org/v2/everything"

# List of parameters needed to access the newsapi
parameters = {"apikey": "56c3709081954cfda0c21f9ac348a775", "pageSize": 100}

# List of states
states = [
    'Alabama',
     'Alaska',
     'Arizona',
     'Arkansas',
     'California',
     'Colorado',
     'Connecticut',
     'Delaware',
     'Florida',
     'Georgia',
     'Hawaii',
     'Idaho',
     'Illinois',
     'Indiana',
     'Iowa',
     'Kansas',
     'Kentucky',
     'Louisiana',
     'Maine',
     'Maryland',
     'Massachusetts',
     'Michigan',
     'Minnesota',
     'Mississippi',
     'Missouri',
     'Montana',
     'Nebraska',
     'Nevada',
     'New Hampshire',
     'New Jersey',
     'New Mexico',
     'New York',
     'North Carolina',
     'North Dakota',
     'Ohio',
     'Oklahoma',
     'Oregon',
     'Pennsylvania',
     'Rhode Island',
     'South Carolina',
     'South Dakota',
     'Tennessee',
     'Texas',
     'Utah',
     'Vermont',
     'Virginia',
     'Washington',
     'West Virginia',
     'Wisconsin',
     'Wyoming']

# List of default images for news
default_images = [
    "https://images.pexels.com/photos/1068530/pexels-photo-1068530.jpeg?auto=compress&cs=tinysrgb&h=350",
     "https://images.pexels.com/photos/230860/pexels-photo-230860.jpeg?auto=compress&cs=tinysrgb&h=350",
     "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?auto=compress&cs=tinysrgb&h=350",
     "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?auto=compress&cs=tinysrgb&h=350",
     "https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg?auto=compress&cs=tinysrgb&h=350"]


# Returns true if url holds an image
def image_exists(url):
    if(url is None):
        return False
    try:
        response = requests.get(url)
        return response.status_code == 200
    except requests.exceptions.MissingSchema:
        return False

# Returns the given image if it is a good image, else returns a default image
def get_image(image):
    if(image_exists(image)):
        return image
    else:
        seed = random.randint(0, len(default_images) - 1)
        assert(seed < len(default_images))
        return default_images[seed]

# Returns a list of articles that are associated with a given state
def find_articles_for_state(state):
    parameters['q'] = 'poverty' + '&' + state
    response = requests.get(url, params=parameters)
    if response.status_code == requests.codes.ok:
        articles = [article for article in response.json()['data']]
        return articles
    return None


# Add news articles about poverty from every state to the database
def add_states_to_table():
    for state in states:
        # Gets every article associated with every state
        articles = find_articles_for_state(state)
        if articles is not None:
            for article in articles:
                # Loops through the articles one by one
                pprint.pprint(article)
                try:
                    # Searches for articles that are associated with poverty
                    if ('poverty' in article['title']) or ('Poverty' in article['title']) or ('poverty' in article['description']) or ('Poverty' in article['description']):
                        curr_article = News(
                            title=article['title'],
                            summary=article['description'],
                            source=article['source']['name'],
                            state=state,
                            author=article['author'],
                            published_date=article['publishedAt'],
                            url=article['url'],
                            image=get_image(article['urlToImage']))
                        db.session.add(curr_article)
                except:
                    pass
        else:
            print("Could not get data from endpoint")

if __name__ == "__main__":
    add_states_to_table()
    db.session.commit()
