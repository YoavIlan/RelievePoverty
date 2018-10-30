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
    rank = db.Column(db.Integer, primary_key=True)
    below_poverty_rate = db.Column(db.String(255))
    child_poverty_rate = db.Column(db.String(255))
    median_income = db.Column(db.String(255))
    counties = db.Column(db.String(255))
    flag = db.Column(db.String(255))

    #image = db.Column(db.String(255))

# Create the database tables.
db.create_all()

url = "https://api.census.gov/data/timeseries/poverty/saipe/"
parameters = {"get":"NAME,STATE,SAEPOVRTALL_PT,SAEPOVRT0_17_PT,SAEMHI_PT", "for":"state:*", "time":2016}


def get_county(state) :
    state_param = "state:" + state
    parameters = {"get":"NAME,COUNTY,SAEPOVRTALL_PT,SAEPOVRT0_17_PT,SAEMHI_PT", "for":"county:*", "in":state_param, "time":2016}

    response = requests.get(url, params=parameters)
    lists = response.json()
    keys = lists[0]
    lists.remove(keys)
    counties = []
    for l in lists :
        it = iter(keys)
        c = {}
        for i in l :
            c[next(it)] = i
        counties.append(c)

    max_poverty_rate = 0
    poorest_county_name = ""
    for county in counties:
        if county["SAEPOVRTALL_PT"] is not None and float(county["SAEPOVRTALL_PT"]) > float(max_poverty_rate):
            max_poverty_rate = county["SAEPOVRTALL_PT"]
            poorest_county_name = county["NAME"]
    print(poorest_county_name)
    return poorest_county_name



def add_state_information():
    response = requests.get(url, params=parameters)
    lists = response.json()
    keys = lists[0]
    lists.remove(keys)
    states = []
    for l in lists :
        it = iter(keys)
        state = {}
        if(l[0] != 'District of Columbia') :
            for i in l :
                state[next(it)] = i
            states.append(state)

    for i in states :
        print(i)
    #states = [state for state in response.json()['NAME']]
    states.sort(key=lambda obj: float(obj['SAEPOVRTALL_PT']))
    for s in states:

        pprint.pprint(s)
        curr_state = States(name=s['NAME'], rank=50-(states.index(s)), below_poverty_rate=s['SAEPOVRTALL_PT'], child_poverty_rate=s['SAEPOVRT0_17_PT'], median_income=s['SAEMHI_PT'], counties=get_county(s["STATE"]), flag='http://www.theus50.com/images/state-flags/' + s['NAME'].lower().replace(" ", "") + '-flag.jpg')
        print(curr_state)
        db.session.add(curr_state)
        db.session.commit()

if __name__ == "__main__":
    add_state_information()
