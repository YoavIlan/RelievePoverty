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


class States(db.Model):
    name = db.Column(db.String(255))
    rank = db.Column(db.String(255))
    below_poverty_rate = db.Column(db.String(255))
    child_poverty_rate = db.Column(db.String(255))
    median_income = db.Column(db.String(255))
    counties = db.Column(db.String(255))
    flag = db.Column(db.String(255))
    id = db.Column(db.Integer, primary_key=True)

    #image = db.Column(db.String(255))

# Create the database tables.
db.create_all()

url = "https://api.census.gov/data/timeseries/poverty/saipe/"
parameters = {"get":"NAME,SAEPOVRTALL_PT,SAEPOVRT0_17_PT,SAEMHI_PT", "for":"state:*", "time":2016}



def add_state_information():
    response = requests.get(url, params=parameters)
    lists = response.json()
    keys = lists[0]
    lists.remove(keys)
    states = []
    for l in lists :
        it = iter(keys)
        state = {}
        for i in l :
            state[next(it)] = i
        states.append(state)

    for i in states :
        print(i)
    #states = [state for state in response.json()['NAME']]
    rates = [state['SAEPOVRTALL_PT'] for state in states]
    rates.sort()
    for s in states:
        pprint.pprint(s)
        print(type(rates))
        curr_state = States(name=s['NAME'], rank=(rates.index(s['SAEPOVRTALL_PT']) + 1), below_poverty_rate=s['SAEPOVRTALL_PT'], child_poverty_rate=s['SAEPOVRT0_17_PT'], median_income=s['SAEMHI_PT'], counties=None, flag=None)
        db.session.add(curr_state)
        db.session.commit()


if __name__ == "__main__":
    add_state_information()
