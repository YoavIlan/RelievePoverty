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
app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://relievepoverty:SWEpoverty6@relievepoverty.cdbjmfurziio.us-east-2.rds.amazonaws.com/RelievePovertyDB'
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

# Url of the charity navigator api
url = "https://api.data.charitynavigator.org/v2/Organizations"
# Dictionary of states as values and their abbreviations as the key
state_dict = {
    'AL': 'Alabama',
     'AK': 'Alaska',
     'AZ': 'Arizona',
     'AR': 'Arkansas',
     'CA': 'California',
     'CO': 'Colorado',
     'CT': 'Connecticut',
     'DC': 'District of Columbia',
     'DE': 'Delaware',
     'FL': 'Florida',
     'GA': 'Georgia',
     'HI': 'Hawaii',
     'ID': 'Idaho',
     'IL': 'Illinois',
     'IN': 'Indiana',
     'IA': 'Iowa',
     'KS': 'Kansas',
     'KY': 'Kentucky',
     'LA': 'Louisiana',
     'ME': 'Maine',
     'MD': 'Maryland',
     'MA': 'Massachusetts',
     'MI': 'Michigan',
     'MN': 'Minnesota',
     'MS': 'Mississippi',
     'MO': 'Missouri',
     'MT': 'Montana',
     'NE': 'Nebraska',
     'NV': 'Nevada',
     'NH': 'New Hampshire',
     'NJ': 'New Jersey',
     'NM': 'New Mexico',
     'NY': 'New York',
     'NC': 'North Carolina',
     'ND': 'North Dakota',
     'OH': 'Ohio',
     'OK': 'Oklahoma',
     'OR': 'Oregon',
     'PA': 'Pennsylvania',
     'RI': 'Rhode Island',
     'SC': 'South Carolina',
     'SD': 'South Dakota',
     'TN': 'Tennessee',
     'TX': 'Texas',
     'UT': 'Utah',
     'VT': 'Vermont',
     'VA': 'Virginia',
     'WA': 'Washington',
     'WV': 'West Virginia',
     'WI': 'Wisconsin',
     'WY': 'Wyoming'}

# List of all default images we use in case of an invalid image url
default_images = [
    "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a26fa6ef06a6598afacebe2cde9be106&auto=format&fit=crop&w=1112&q=80",
    "https://images.pexels.com/photos/1260293/pexels-photo-1260293.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    "https://as2.ftcdn.net/jpg/01/28/88/01/500_F_128880100_NE4CKidKwEtT2jIo9tx4cbyYV4IsCW9P.jpg",
    "https://images.pexels.com/photos/1493374/pexels-photo-1493374.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.pexels.com/photos/933632/pexels-photo-933632.jpeg?auto=compress&cs=tinysrgb&h=350",
    "https://images.unsplash.com/photo-1495556650867-99590cea3657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b37de0c33fc4709959e640e0ea309a8a&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e6daa4b6ab26a89c93cd9b84fee487fe&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1527833296831-2dcbf098d66f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=48525d2cd5d799ae0c19cbdb40442c45&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ee665399b33bc893141af2bc7bb87333&auto=format&fit=crop&w=1350&q=80"]


# Truncates url to help with clearbit's url
def truncate_url(url):
    temp = url
    url = url.replace("https", "")
    url = url.replace("http", "")
    url = url.replace("www.", "")
    url = url.replace("://", "")
    url = url.replace("charitynavigator", "SKIP THIS URL")
    print(temp + "-->" + url)
    return url

# Returns true if an image exists at the url


def image_exists(url):
    if(url == "NULL"):
        return False
    try:
        response = requests.get(url)
        return response.status_code != 404
    except requests.exceptions.MissingSchema:
        return True

# Returns an image using clearbit from a given url, returns a defualt
# image if the clearbit one does not exist


def get_image(url):
    img = "https://logo.clearbit.com/" + truncate_url(url)
    # If img does not exist select a default image at random
    if(not image_exists(img)):
        seed = random.randint(0, len(default_images) - 1)
        assert(seed < len(default_images))
        img = default_images[seed]
    print(img)
    return img

# build complete address from separate fields


def build_address(address):
    # return "HI"
    if(address is None):
        return "No Address Available"

    # Merges multiple fields from charity navigator to be one address field
    builder = StringIO()
    if "streetAddress1" in address and address["streetAddress1"] is not None:
        builder.write(address["streetAddress1"])
        builder.write(u"\n")
    if "streetAddress2" in address and address["streetAddress2"] is not None:
        builder.write(address["streetAddress2"])
        builder.write(u"\n")
    if "city" in address and address["city"] is not None:
        builder.write(address["city"])
        builder.write(u", ")
    if "stateOrProvince" in address and address["stateOrProvince"] is not None:
        builder.write(address["stateOrProvince"])
    if "postalCode" in address and address["postalCode"] is not None:
        builder.write(u" ")
        builder.write(address["postalCode"])
    return builder.getvalue()

# Adds a json format of charities to the database. Handles missing information


def add_charities(charities):
    # Loop through all of the charities that match the query
    for charity in charities:
        print(charity["charityName"])
        # Use helper method to get the address
        address = build_address(charity["mailingAddress"])

        # Grabs state information
        state = "null"
        if "stateOrProvince" in charity["mailingAddress"]:
            # Chose not to include charities in Washington DC or those not
            # affiliated with a state
            if charity["mailingAddress"]["stateOrProvince"] == "DC" or charity["mailingAddress"]["stateOrProvince"] is None:
                continue
            state = state_dict[
                charity[
                    "mailingAddress"][
                        "stateOrProvince"]]

        # Grabs cause information if available, defaults to NULL if not
        cause = "NULL"
        if "cause" in charity:
            cause = charity["cause"]["causeName"]

        # Grabs rate information if available, defaults to 3 if not
        rate = 3
        if "currentRating" in charity and charity["currentRating"]["rating"] is not None:
            rate = charity["currentRating"]["rating"]

        # Grabs URL if available, defaults to the location of the charity on the Charity Navigator website
        # Uses URL and clearbit website to get an image for the database
        webURL = ""
        clearbit_img = ""
        if charity["websiteURL"] is None:
            clearbit_img = get_image("NO URL")
            webURL = charity["charityNavigatorURL"]
        else:
            webURL = charity["websiteURL"]
            clearbit_img = get_image(webURL)

        # Create an instance of a charity for our database
        charity_row = Charities(
            url=webURL,
            name=charity["charityName"],
            rating=rate,
            mission=charity["mission"],
            affiliation=charity["irsClassification"]["affiliation"],
            tax_classification=charity["irsClassification"]["subsection"],
            state=state,
            address=address,
            img=clearbit_img,
            cause_name=cause)
        # Add the new charity to the database
        db.session.merge(charity_row)


# Returns a list of charities given a query, uses the search function from
# Charity navigator
def get_charities_by_query(query):
    assert query is not None
    parameters = {
        "app_key": "a73a5106424083ff1985b43f40472f9b",
        "app_id": "c030298c",
     "search": query}
    response = requests.get(url, params=parameters)
    if response is not None and response.status_code == requests.codes.ok:
        # Pass a list of all the charities that match the query to
        # add_charities
        add_charities(response.json())
    else:
        print("Could not reach endpoint")


# Returns a list of charities that match categoryID of 6 which is for
# poverty related charities
def get_charities_by_category():
    parameters = {
        "app_key": "a73a5106424083ff1985b43f40472f9b",
        "app_id": "c030298c",
     "categoryID": "6"}
    response = requests.get(url, params=parameters)
    if response.status_code == requests.codes.ok and response is not None:
        # Pass a list of all the charities that match the query to
        # add_charities
        add_charities(response.json())
    else:
        print("Could not reach endpoint")

if __name__ == "__main__":
    get_charities_by_category()
    get_charities_by_query("poverty")
    get_charities_by_query("homeless")
    db.session.commit()
