import flask
import flask_sqlalchemy
import flask_restless
import sqlalchemy
from flask import request
from re import sub
import datetime


INSTANCES_PER_PAGE = 12
SEARCH_ALL_INSTANCES_PER_PAGE = 3
DATABASE_URI = 'mysql+pymysql://relievepoverty:SWEpoverty6@relievepoverty.cdbjmfurziio.us-east-2.rds.amazonaws.com/RelievePovertyDB'


# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
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
    rating = db.Column(db.Integer)
    url = db.Column(db.String(255))
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
            "cause_name": self.cause_name,
            "rating": self.rating,
            "url" : self.url
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
@app.route("/v1/news/<id>", methods=['GET'])
def getNewsById(id):
    return flask.jsonify(News.serialize(News.query.get(id)))

# Gets all news articles. Supports pagination, filtering, sorting, and searching
@app.route("/v1/news", methods=['GET'])
def getAllNews():
    news = []
    # Get all search queries
    query = request.args.get('q')
    # If search is empty then add all instances to news, else only add the articles that the search query matched
    if query is None:
        news = News.query.all()
    else:
        news = news_search(query)

    # Searing for filters as arguments and filtering out those that don't mach the filter
    # Year requires a special filter due to the DateTime type
    now = datetime.datetime.now()
    days = 0
    if 'date' in request.args:
        if(request.args['date'] == 'past year'):
            days = 365
        elif(request.args['date'] == 'past month'):
            days = 30
        else:
            days = 7
        news = filter(lambda n: (now - News.serialize(n)['published_date']).days < days, news)
    filters = ['state', 'author', 'source']
    for fil in filters:
        if(fil in request.args):
            news = filter(lambda n: str(News.serialize(n)[fil]) == request.args[fil], news)

    # Sort by the sort_by variable, reverse only if reverse is true
    if "sort_by" in request.args:
        news.sort(key=lambda x: News.serialize(x)[request.args.get('sort_by')], reverse=(request.args.get('reverse')=='true'))

    total = len(news)
    # If a page was requested, only return the instances that would be on that page
    if 'page' in request.args:
        result = list()
        i = (int(request.args['page']) - 1) * INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + INSTANCES_PER_PAGE, total) + 1):
            result.append(news[i-1])
        return flask.jsonify({'data': [News.serialize(news) for news in result], 'total': total})
    # If there were no pages were requested, then return all instances
    return flask.jsonify({'data': [News.serialize(news) for news in news], 'total': total})

# Gets a specific charity by its primary key
@app.route("/v1/charities/<id>", methods=['GET'])
def getCharityById(id):
    return flask.jsonify(Charities.serialize(Charities.query.get(id)))

# Gets all charities. Supports pagination, filters, sorting, and searching
@app.route("/v1/charities", methods=['GET'])
def getAllCharities():
    charities = []
    # Get all search query
    query = request.args.get('q')
    # If search is empty then add all instances to news, else only add the articles that the search query matched
    if query is None:
        charities = Charities.query.all()
    else:
        charities = charities_search(query)

    # Filters out any instances using the given filters
    filters = ['state', 'rating', 'affiliation','tax_classification', 'cause']
    for fil in filters:
        if(fil in request.args):
            charities = filter(lambda n: str(Charities.serialize(n)[fil]) == request.args[fil], charities)

    # Sorts the instances by the given variable in sort_by
    if "sort_by" in request.args :
        if(request.args.get('sort_by') in ["rating"]):
            charities.sort(key=lambda x: float(Charities.serialize(x)[request.args.get('sort_by')]), reverse=(request.args.get('reverse')=='true'))
        else:
            charities.sort(key=lambda x: Charities.serialize(x)[request.args.get('sort_by')], reverse=(request.args.get('reverse')=='true'))

    total = len(charities)
    # If a page is provided than only return the instances that should appear on that page
    if 'page' in request.args:
        result = list()
        i = (int(request.args['page']) - 1) * INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + INSTANCES_PER_PAGE, total) + 1):
            result.append(charities[i-1])
        return flask.jsonify({'data': [Charities.serialize(charity) for charity in result], 'total': total})
    # If there is no page provided, return all the instances
    return flask.jsonify({'data': [Charities.serialize(charity) for charity in charities], 'total': total})

# Gets a specific state by its name
@app.route("/v1/states/<state>", methods=['GET'])
def getStateByName(state):
    return flask.jsonify(States.serialize(States.query.filter_by(name=state)[0]))

# Gets all states. Supports pagination, filtering, sorting, and searching
@app.route("/v1/states", methods=['GET'])
def getAllStates():
    states = []
    # Get all search queries
    query = request.args.get('q')
    # If there is no search query add all state instances, else add only the instances that match the search query
    if query is None:
        states = States.query.all()
    else:
        states = state_search(query)

    # Filter by any filter provided
    filters = ['median_income', 'below_poverty_rate', 'child_poverty_rate']
    for fil in filters:
        if (fil + "_low") in request.args:
            states = filter(lambda n: (float(States.serialize(n)[fil]) >= float(request.args[fil + '_low'])) and (float(States.serialize(n)[fil]) < float(request.args[fil+'_high'])), states)

    # Sort by the variables given in the sort_by argument
    if "sort_by" in request.args :
        # Converts these variables to floats so it can compare.
        if(request.args.get('sort_by') in ["below_poverty_rate", "child_poverty_rate", "median_income"]):
            states.sort(key=lambda x: float(States.serialize(x)[request.args.get('sort_by')]), reverse=(request.args.get('reverse')=='true'))
        else:
            states.sort(key=lambda x: States.serialize(x)[request.args.get('sort_by')], reverse=(request.args.get('reverse')=='true'))

    total = len(states)
    # If a page is requested return only the instnaces required by the page
    if 'page' in request.args:
        result = list()
        i = (int(request.args['page']) - 1) * INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + INSTANCES_PER_PAGE, total) + 1):
            result.append(states[i-1])
        return flask.jsonify({'data': [States.serialize(state) for state in result], 'total': total})
    # If no pages are requested return all the state instances
    return flask.jsonify({'data': [States.serialize(state) for state in states], 'total': total})


@app.route("/")
def home():
    return "Welcome to the RelievePoverty.me API!<br>You can find the documentation at <a href='https://documenter.getpostman.com/view/5460449/RWgjY1qy'>https://documenter.getpostman.com/view/5460449/RWgjY1qy</a>"

"""
Helper method used by all of the search functions
Takes in an array where the array holds the point values where the
indexes are the primary key that holds that point value
"""
def getIDsByPoints(points):
    ids = []
    all_zero = False
    while(max(points) != 0):
        m = max(points)
        index = points.index(m)
        points[index] = 0
        ids.append(index)
    return ids

# Helper method for news_search and charities_search
# Adds val to the points array for the primary keys of the instances that were given
def updatePoints(val, points, instances, adj=0):
    for f in instances:
        points[f.id - 1 + adj] += val

# Helper method for state_search
# Adds val to the points array for the primary keys of the instances that were given
def updatePointsState(val, points, instances):
    for f in instances:
        points[f.rank - 1] += val


# Search for state instances given a query
def state_search(query):
    # Turn the query into a list of searach strings and remove bad characters
    searches = query.split(" ")
    for i in range(len(searches)):
        searches[i] = sub("[\\ \" \' ;]", "", searches[i])

    # Ranking Relevances by Points
    points = [0] * len(States.query.all())
    for s in searches:
        x = "%" + s + "%"
        updatePointsState(200, points, States.query.filter(States.name.like(x)).all())
        updatePointsState(99, points, States.query.filter(States.counties.like(x)).all())

    # Turning list of points with index=id into sorted list of ids
    ids = getIDsByPoints(points)

    # Grabbing instances by id in order
    results = []
    for i in ids:
        results.append(States.query.get(i + 1))

    return results

# Search for charity instances given a query
def charities_search(query):
    # Turn the query into a list of searach strings and remove bad characters
    searches = query.split(" ")
    for i in range(len(searches)):
        searches[i] = sub("[\\ \" \' ;]", "", searches[i])

    # Ranking Relevances by Points
    points = [0] * len(Charities.query.all())
    for s in searches:
        x = "%" + s + "%"
        updatePoints(200, points, Charities.query.filter(Charities.name.like(x)).all())
        updatePoints(99, points, Charities.query.filter(Charities.state.like(x)).all())

    # Turning list of points with index=id into sorted list of ids
    ids = getIDsByPoints(points)

    # Grabbing instances by id in order
    results = []
    for i in ids:
        results.append(Charities.query.get(i + 1))

    return results

# Search for charity instances given a query
def news_search(query):
    # Turn the query into a list of searach strings and remove bad characters
    searches = query.split(" ")
    for i in range(len(searches)):
        searches[i] = sub("[\\ \" \' ;]", "", searches[i])

    # Ranking Relevances by Points
    points = [0] * len(News.query.all())
    for s in searches:
        x = "%" + s + "%"
        updatePoints(200, points, News.query.filter(News.title.like(x)).all())
        updatePoints(99, points, News.query.filter(News.author.like(x)).all())
        updatePoints(98, points, News.query.filter(News.state.like(x)).all())
        updatePoints(97, points, News.query.filter(News.source.like(x)).all())
        updatePoints(49, points, News.query.filter(News.summary.like(x)).all())


    # Turning list of points with index=id into sorted list of ids
    ids = getIDsByPoints(points)

    # Grabbing instances by id in order
    results = []
    for i in ids:
        results.append(News.query.get(i + 1))

    return results



# Returns a json with three inner jsons one for each category
@app.route("/v1/search/<query>", methods=['GET'])
def all_search(query):
    # Searches each category and saves results
    states = state_search(query)
    charities = charities_search(query)
    news = news_search(query)
    total = len(news)
    if 'news_page' in request.args:
        result = list()
        i = (int(request.args['news_page']) - 1) * SEARCH_ALL_INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + SEARCH_ALL_INSTANCES_PER_PAGE, total) + 1):
            result.append(news[i-1])
        news_json= {'data': [News.serialize(news) for news in result], 'total': total}
    else:
        news_json = {'data': [News.serialize(news) for news in news], 'total': total}

    total = len(states)
    if 'states_page' in request.args:
        result = list()
        i = (int(request.args['states_page']) - 1) * SEARCH_ALL_INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + SEARCH_ALL_INSTANCES_PER_PAGE, total) + 1):
            result.append(states[i-1])
        states_json= {'data': [States.serialize(states) for states in result], 'total': total}
    else:
        states_json = {'data': [States.serialize(state) for state in states], 'total': total}

    total = len(charities)
    if 'charities_page' in request.args:
        result = list()
        i = (int(request.args['charities_page']) - 1) * SEARCH_ALL_INSTANCES_PER_PAGE
        for i in range(i + 1, min(i + SEARCH_ALL_INSTANCES_PER_PAGE, total) + 1):
            result.append(charities[i-1])
        charities_json= {'data': [Charities.serialize(charity) for charity in result], 'total': total}
    else:
        charities_json = {'data': [Charities.serialize(charity) for charity in charities], 'total': total}


    return flask.jsonify({'states': states_json, 'charities': charities_json,
        'news': news_json})





@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add(
        'Access-Control-Allow-Headers',
        'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET')
    return response

# start the flask loop
app.run(debug=True, host='0.0.0.0', port=80)
#app.run(debug=True, host='127.0.0.1', port=5000)
