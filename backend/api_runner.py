import flask
import flask_sqlalchemy
import flask_restless
from flask import request

INSTANCES_PER_PAGE = 12

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
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "state": self.state,
            "summary": self.summary,
            "source": self.source,
            "author": self.author,
            "published_date": self.published_date,
            "url": self.url,
            "image": self.image
        }

class Charities(db.Model):
    name = db.Column(db.String(255))
    mission = db.Column(db.String(255))
    affiliation = db.Column(db.String(255))
    tax_classification = db.Column(db.String(255))
    state = db.Column(db.String(255))
    address = db.Column(db.String(255))
    img = db.Column(db.String(255))
    cause_name = db.Column(db.String(255))
    id = db.Column(db.Integer, primary_key=True)
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "mission": self.mission,
            "affiliation": self.affiliation,
            "tax_classification": self.tax_classification,
            "state": self.state,
            "address": self.address,
            "img": self.img,
            "cause_name": self.cause_name
        }


class States(db.Model):
    name = db.Column(db.String(255))
    rank = db.Column(db.Integer, primary_key=True)
    below_poverty_rate = db.Column(db.String(255))
    child_poverty_rate = db.Column(db.String(255))
    median_income = db.Column(db.String(255))
    counties = db.Column(db.String(255))
    flag = db.Column(db.String(255))
    def serialize(self):
        return {
            "name": self.name,
            "rank": self.rank,
            "below_poverty_rate": self.below_poverty_rate,
            "child_poverty_rate": self.child_poverty_rate,
            "median_income": self.median_income,
            "counties": self.counties,
            "flag": self.flag
        }

db.create_all()

# Gets a specific news article by its primary key
@app.route("/api/v1/news/<id>", methods=['GET'])
def getNewsById(id):
    return flask.jsonify(News.serialize(News.query.get(id)))

# Gets all news articles. Supports pagination and filtering by states.
@app.route("/api/v1/news", methods=['GET'])
def getAllNews():
    if 'state' in request.args:
        return flask.jsonify([News.serialize(news) for news in News.query.filter_by(state=request.args['state'])])
    if 'page' in request.args:
        result = list();
        total = len(News.query.all())    
        i = (int(request.args['page']) - 1) * INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + INSTANCES_PER_PAGE, total) + 1):
            result.append(News.query.get(i))
        return flask.jsonify([News.serialize(news) for news in result])
    return flask.jsonify([News.serialize(news) for news in News.query.all()])

# Gets a specific charity by its primary key
@app.route("/api/v1/charities/<id>", methods=['GET'])
def getCharityById(id):
    return flask.jsonify(Charities.serialize(Charities.query.get(id)))

# Gets all charities. Supports pagination and filtering by states.
@app.route("/api/v1/charities", methods=['GET'])
def getAllCharities():
    if 'state' in request.args:
        return flask.jsonify([Charities.serialize(charity) for charity in Charities.query.filter_by(state=request.args['state'])])
    if 'page' in request.args:
        result = list();
        total = len(Charities.query.all())    
        i = (int(request.args['page']) - 1) * INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + INSTANCES_PER_PAGE, total) + 1):
            result.append(Charities.query.get(i))
        return flask.jsonify([Charities.serialize(charity) for charity in result])
    return flask.jsonify([Charities.serialize(charity) for charity in Charities.query.all()])

# Gets a specific state by its name
@app.route("/api/v1/states/<state>", methods=['GET'])
def getStateByName(state):
    return flask.jsonify(States.serialize(States.query.filter_by(name=state)[0]))

# Gets all states. Supports pagination.
@app.route("/api/v1/states", methods=['GET'])
def getAllStates():
    if 'page' in request.args:
        result = list();
        total = len(States.query.all())    
        i = (int(request.args['page']) - 1) * INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + INSTANCES_PER_PAGE, total) + 1):
            result.append(States.query.get(i))
        return flask.jsonify([States.serialize(state) for state in result])
    return flask.jsonify([States.serialize(state) for state in States.query.all()])

@app.route("/")
def home():
    return "Welcome to the RelievePoverty.me API!<br>You can find the documentation at <a href='https://documenter.getpostman.com/view/5460449/RWgjY1qy'>https://documenter.getpostman.com/view/5460449/RWgjY1qy</a>"


# start the flask loop
app.run(debug=True, host='127.0.0.1', port=8080)