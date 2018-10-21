import requests
import pprint
import flask
import flask_sqlalchemy
import flask_restless
from cStringIO import StringIO


# http://127.0.0.1:5000/api/v1/news

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://relievepoverty:SWEpoverty6@relievepoverty.cdbjmfurziio.us-east-2.rds.amazonaws.com/RelievePovertyDB'
db = flask_sqlalchemy.SQLAlchemy(app)


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

# Create the database tables.
db.create_all()

url = "https://api.data.charitynavigator.org/v2/Organizations"
state_dict = {'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming'}

def build_address(address_fields):
    builder = StringIO()
    builder.write(address_fields["streetAddress1"])
    builder.write("\n")
    if address_fields["streetAddress2"] != None:
        builder.write(address_fields["streetAddress2"])
        builder.write("\n")
    builder.write(address_fields["city"])
    builder.write(", ")
    builder.write(address_fields["stateOrProvince"])
    builder.write(" ")
    builder.write(address_fields["postalCode"])
    return builder.getvalue()

def get_charities_by_category():
    parameters = {"app_key":"0efb8566aac6ae0816327eb85748219a", "app_id":"6c538fc3", "categoryID": "6"}
    response = requests.get(url, params=parameters)
    charities = response.json()
    for charity in charities:
        # build complete address from separate fields
        address = build_address(charity["mailingAddress"])

        charity_row = Charities(name=charity["charityName"], mission=charity["mission"], affiliation=charity["irsClassification"]["affiliation"], tax_classification=charity["irsClassification"]["subsection"], state=state_dict[charity["mailingAddress"]["stateOrProvince"]], address=address, img=charity["cause"]["image"], cause_name=charity["cause"]["causeName"])
        db.session.add(charity_row)
    db.session.commit()

def get_charities_by_query():
    parameters = {"app_key":"0efb8566aac6ae0816327eb85748219a", "app_id":"6c538fc3", "search":"poverty"}
    response = requests.get(url, params=parameters)
    charities = response.json()
    for charity in charities:
        # build complete address from separate fields
        address = build_address(charity["mailingAddress"])

        charity_row = Charities(name=charity["charityName"], mission=charity["mission"], affiliation=charity["irsClassification"]["affiliation"], tax_classification=charity["irsClassification"]["subsection"], state=state_dict[charity["mailingAddress"]["stateOrProvince"]], address=address, img=charity["cause"]["image"], cause_name=charity["cause"]["causeName"])
        db.session.add(charity_row)
    db.session.commit()

if __name__ == "__main__":
    get_charities_by_category()
    get_charities_by_query()
