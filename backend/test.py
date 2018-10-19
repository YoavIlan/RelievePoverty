import flask
import flask_sqlalchemy
import flask_restless

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
app.config['DEBUG'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://relievepoverty:SWEpoverty6@relievepoverty.cdbjmfurziio.us-east-2.rds.amazonaws.com/RelievePovertyDB'
db = flask_sqlalchemy.SQLAlchemy(app)


# Create your Flask-SQLALchemy models as usual but with the following
# restriction: they must have an __init__ method that accepts keyword
# arguments for all columns (the constructor in
# flask_sqlalchemy.SQLAlchemy.Model supplies such a method, so you
# don't need to declare a new one).
# class Person(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.Unicode)
#     birth_date = db.Column(db.Date)


# class Article(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.Unicode)
#     published_at = db.Column(db.DateTime)
#     author_id = db.Column(db.Integer, db.ForeignKey('person.id'))
#     author = db.relationship(Person, backref=db.backref('articles',
#                                                         lazy='dynamic'))
class test(db.Model):
    # id = db.Column(db.Integer, primary_key=True)
    col1 = db.Column(db.Integer, primary_key=True)
    col2 = db.Column(db.Unicode)
    col3 = db.Column(db.Unicode)

# Create the database tables.
db.create_all()

# Create the Flask-Restless API manager.
manager = flask_restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(test, methods=['GET', 'POST', 'DELETE'], url_prefix='/api/v1')
# manager.create_api(Article, methods=['GET', 'POST', 'DELETE'], url_prefix='/api/v1')

# start the flask loop
app.run()