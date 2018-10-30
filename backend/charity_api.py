import requests
import pprint
import flask
import flask_sqlalchemy
import flask_restless
from io import StringIO


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
    rating = db.Column(db.Integer)
    url = db.Column(db.String(255))
    id = db.Column(db.Integer)

# Create the database tables.
db.create_all()

url = "https://api.data.charitynavigator.org/v2/Organizations"
state_dict = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DC':'District of Columbia', 'DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming'}

def build_address(address):
    # build complete address from separate fields

    if(address is None):
        return "No Address Available"

    builder = StringIO()
    if "streetAddress1" in address and address["streetAddress1"] is not None:
        builder.write(address["streetAddress1"])
        builder.write("\n")
    if "streetAddress2" in address and address["streetAddress2"] is not None :
        builder.write(address["streetAddress2"])
        builder.write("\n")
    if "city" in address and address["city"] is not None:
        builder.write(address["city"])
        builder.write(", ")
    if "stateOrProvince" in address and address["stateOrProvince"] is not None:
        builder.write(address["stateOrProvince"] )
    if "postalCode" in address and address["postalCode"] is not None:
        builder.write(" ")
        builder.write(address["postalCode"])
    return builder.getvalue()

def get_charities_by_query(query):
    assert query is not None
    parameters = {"app_key":"a73a5106424083ff1985b43f40472f9b", "app_id":"c030298c", "search":query}
    response = requests.get(url, params=parameters)
    if response is not None and response.status_code == requests.codes.ok:
        charities = response.json()
        for charity in charities:
            print(charity["charityName"])
            address = build_address(charity["mailingAddress"])
            state = "null"
            if "stateOrProvince" in charity["mailingAddress"]:
                if charity["mailingAddress"]["stateOrProvince"] == "DC" or charity["mailingAddress"]["stateOrProvince"] == None:
                    continue
                state = state_dict[charity["mailingAddress"]["stateOrProvince"]]
            cause = "NULL"
            if "cause" in charity:
                cause = charity["cause"]["causeName"]
            rate = 3
            if "currentRating" in charity and charity["currentRating"]["rating"] is not None:
                rate = charity["currentRating"]["rating"]
            webURL = charity["websiteURL"]
            if charity["websiteURL"] is None :
                webURL = charity["charityNavigatorURL"]
            charity_row = Charities(url=webURL, name=charity["charityName"], rating=rate, mission=charity["mission"], affiliation=charity["irsClassification"]["affiliation"], tax_classification=charity["irsClassification"]["subsection"], state=state, address=address, img="null", cause_name=cause)
            db.session.merge(charity_row)
    else:
        print("Could not reach endpoint")

def get_charities_by_category():
    parameters = {"app_key":"a73a5106424083ff1985b43f40472f9b", "app_id":"c030298c", "categoryID": "6"}
    response = requests.get(url, params=parameters)
    if response.status_code == requests.codes.ok and response is not None:
        charities = response.json()
        for charity in charities:
            print(charity["charityName"])
            address = build_address(charity["mailingAddress"])
            state = "null"
            if "stateOrProvince" in charity["mailingAddress"]:
                if charity["mailingAddress"]["stateOrProvince"] == "DC" or charity["mailingAddress"]["stateOrProvince"] == None:
                    continue
                state = state_dict[charity["mailingAddress"]["stateOrProvince"]]
            cause = "NULL"
            if "cause" in charity:
                cause = charity["cause"]["causeName"]
            rate = 3
            if "currentRating" in charity:
                rate = charity["currentRating"]["rating"]
            webURL = charity["websiteURL"]
            if charity["websiteURL"] is None :
                webURL = charity["charityNavigatorURL"]
            charity_row = Charities(url=webURL, rating=rate, name=charity["charityName"], mission=charity["mission"], affiliation=charity["irsClassification"]["affiliation"], tax_classification=charity["irsClassification"]["subsection"], state=state, address=address, img="null", cause_name=cause)
            db.session.add(charity_row)
    else:
        print("Could not reach endpoint")

if __name__ == "__main__":
    get_charities_by_category()
    get_charities_by_query("poverty")
    get_charities_by_query("homeless")
    db.session.commit()
