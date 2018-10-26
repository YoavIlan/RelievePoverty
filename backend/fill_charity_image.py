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


class Charities(db.Model):
    name = db.Column(db.String(255), primary_key=True)
    mission = db.Column(db.String(255))
    affiliation = db.Column(db.String(255))
    tax_classification = db.Column(db.String(255))
    state = db.Column(db.String(255))
    address = db.Column(db.String(255))
    img = db.Column(db.String(255))
    cause_name = db.Column(db.String(255))
    id = db.Column(db.Integer)

# Create the database tables.
db.create_all()



images = ["https://images.pexels.com/photos/1260293/pexels-photo-1260293.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260","https://as2.ftcdn.net/jpg/01/28/88/01/500_F_128880100_NE4CKidKwEtT2jIo9tx4cbyYV4IsCW9P.jpg","https://images.pexels.com/photos/1493374/pexels-photo-1493374.jpeg?auto=compress&cs=tinysrgb&h=350","https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&h=350","https://images.pexels.com/photos/933632/pexels-photo-933632.jpeg?auto=compress&cs=tinysrgb&h=350"]

def exists(url):
    if(url == "NULL"):
        print("URL is NULL")
        return False
    try:
        response = requests.get(url)
        print(response.status_code)
        return response.status_code != 404
    except requests.exceptions.MissingSchema:
        print("Not able to read URL")
        return True

def fill_images(ids):
    seed = random.randint(0, len(images) - 1)
    assert(seed < 5)
    for i in ids :
        c = Charities.query.filter_by(id=i).first()
        print "ID = ", i
        if(not exists(c.img)):
            print("Before: " +c.img)
            c.img = images[seed]
            print("After: " + c.img)
            print
            seed = seed + 1 if seed + 1 < len(images) else 0
            db.session.commit()


if __name__ == "__main__":
    fill_images(range(1, int(sys.argv[1])+1))