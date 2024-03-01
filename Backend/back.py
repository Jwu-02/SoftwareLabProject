from flask import Flask
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://aam6728:Alexces0713@albertomartinezcluster.4vpfzm7.mongodb.net/')
db = client['user_database']
collection = db['users']


@app.route('/') # Serves the landing page 
def index():
    return render_template('index.html')

# Handles the submission of user data from the frontend application and saves it in the database.
@app.route('/save_user', methods=['POST']) 
def save_user():
    if request.method == 'POST':
        userID = request.form['userID']
        password = request.form['password']

        # Check if the user already exists based on userID
        if collection.find_one({'userID': userID}):
            return 'User successfully signed-in'
        
        else:
            # Insert the new user
            collection.insert_one({'userID': userID, 'password': password})
            return 'New User successfully created'
        
if __name__ == '__main__':
    app.run(debug=True)