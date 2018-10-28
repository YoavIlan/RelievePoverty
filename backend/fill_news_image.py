import requests
import pprint
import flask
import flask_sqlalchemy
import flask_restless
from io import StringIO
import sys
import random

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



images = ["https://images.pexels.com/photos/1068530/pexels-photo-1068530.jpeg?auto=compress&cs=tinysrgb&h=350", "https://images.pexels.com/photos/230860/pexels-photo-230860.jpeg?auto=compress&cs=tinysrgb&h=350", "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?auto=compress&cs=tinysrgb&h=350", "https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?auto=compress&cs=tinysrgb&h=350", "https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg?auto=compress&cs=tinysrgb&h=350"]

def exists(url):
    if(url is None):
        print("URL is NULL")
        return False
    try:
        response = requests.get(url)
        print(response.status_code)
        return response.status_code == 200
    except requests.exceptions.MissingSchema:
        print("Not able to read URL")
        return False

def fill_images(ids):
    seed = random.randint(0, len(images) - 1)
    assert(seed < 5)
    for i in ids :
        c = News.query.filter_by(id=i).first()
        print "ID = ", i
        if(not exists(c.image)):
            if(c.image is None):
                print("Before: None")
            else:
                print("Before: " +c.image)
            c.image = images[seed]
            print("After: " + c.image)
            print
            seed = seed + 1 if seed + 1 < len(images) else 0
            db.session.commit()

if __name__ == "__main__":
    fill_images(range(1, int(sys.argv[1])+1))
