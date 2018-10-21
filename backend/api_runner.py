import flask
import flask_sqlalchemy
import flask_restless
from flask import request

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

# Create the database tables.
db.create_all()

# Gets a specific news article by its primary key
@app.route("/api/v1/news/<id>", methods=['GET'])
def getNewsById(id):
    return flask.jsonify(News.serialize(News.query.get(request.view_args['id'])))

# Gets all news articles. Supports pagination and filtering by states.
@app.route("/api/v1/news", methods=['GET'])
def getAllNews():
    if 'state' in request.args:
        return flask.jsonify([News.serialize(news) for news in News.query.filter_by(state=request.args['state'])])
    if 'page' in request.args:
        result = list();
        total = len(News.query.all())    
        i = max(1, (int(request.args['page']) - 1) * 12)
        for i in range(i, min(i + 12, total + 1)):
            result.append(News.query.get(i))
        return flask.jsonify([News.serialize(news) for news in result])
    return flask.jsonify([News.serialize(news) for news in News.query.all()])

@app.route("/")
def home():
    return "Welcome to the RelievePoverty.me API!<br>You can find the documentation at <a href='https://documenter.getpostman.com/view/5460449/RWgjY1qy'>https://documenter.getpostman.com/view/5460449/RWgjY1qy</a>"


# start the flask loop
app.run(debug=True, host='0.0.0.0', port=8080)