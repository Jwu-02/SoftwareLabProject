from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson.json_util import dumps
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb+srv://aam6728:Alexces0713@albertomartinezcluster.4vpfzm7.mongodb.net/')
db = client.get_database('user_db')
user_collection = db.get_collection('users')

# for context, 200 is the HTTP status code that the server sent back to the client. 
# 200 means “OK”, 201 means “Created”, 400 means “Bad Request”, and 401 means “Unauthorized”.

@app.route('/save_user', methods=['POST'])
def save_user():
    data = request.get_json()
    user_id = data.get('userID')
    password = data.get('password')

    if user_collection.find_one({'userID': user_id}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    user_collection.insert_one({'userID': user_id, 'password': hashed_password})

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user_id = data.get('userID')
    password = data.get('password')

    user = user_collection.find_one({'userID': user_id})

    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid username or password'}), 401

    return jsonify({'message': 'Logged in successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
