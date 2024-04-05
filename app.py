from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import datetime
###
from werkzeug.security import generate_password_hash, check_password_hash

###
# Thu Testing

x = datetime.datetime.now()

# Initializing flask app
# app = Flask(__name__)
app = Flask(__name__, static_folder="build", template_folder="build", static_url_path="/")
CORS(app)

# Connect to MongoDB
# client = MongoClient('mongodb+srv://thunguyen8:ece461l@@cluster0.bor9lkx.mongodb.net/')
# client = MongoClient('mongodb+srv://aam6728:Alexces0713@albertomartinezcluster.4vpfzm7.mongodb.net/')
client = MongoClient('mongodb+srv://annh782000:Doxul567mZGwihXf@cluster0.5yyeo3b.mongodb.net/')

db = client.get_database('user_db')
user_collection = db.get_collection('users')
print(db.list_collection_names())

HW_collection = db.get_collection('HWsets')
# Sample data for hardware sets
hw_sets_data = [
    {"HW_num": 1, "cap": 100, "avail": 100},
    {"HW_num": 2, "cap": 150, "avail": 150},
    {"HW_num": 3, "cap": 200, "avail": 200}
]

projects_collection = db.get_collection('Projects')


# Inserting hardware sets into the collection

@app.route('/', methods=["GET"])
def index():
    return render_template('index.html')


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


################################################################################
# This is for Project_v1 that associate with userID
@app.route('/project', methods=['POST'])
def projectManagement():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    projectid = data.get('projectID')
    # project  = user_collection.find_one({'userID': userID})
    return jsonify({'message': 'Entering your database'}), 200


# 200 means that everything is ok and is proceeding

@app.route('/create_project', methods=['POST'])
def createNewProject():
    data = request.get_json()
    user_id = data.get('userID')
    name = data.get('name')
    description = data.get('description')
    project_id = data.get('projectID')

    user = user_collection.find_one({'userID': user_id})
    if not user:
        return jsonify({'message': 'User not found'}), 404

    else:
        if project_id in user.get('projectIDs', []):
            return jsonify({'message': f'Project ID {project_id} already exists for user {user_id}'}), 400

    # This is how you add to the database
    user_collection.update_one({'userID': user_id}, {'$push': {'projectIDs': project_id}})
    return jsonify({'message': f'Project ID {project_id} created for user {user_id}'}), 201


@app.route('/existing_project', methods=['POST'])
def existingProject():
    data = request.get_json()
    user_id = data.get('userID')
    project_id = data.get('projectID')

    user = user_collection.find_one({'userID': user_id})

    if user and project_id in user.get('projectIDs', []):
        # Project ID exists in the user's list of projectIDs
        return jsonify({'message': f'Project ID {project_id} exists for user {user_id}'}), 200
    else:
        return jsonify({'message': f'Project ID {project_id} does not exist for user {user_id}'}), 404


################################################################################


################################################################################
# This is for Project: Only due with Project database, no userID involve
@app.route('/new_project', methods=['POST'])
def create_NewProject():
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    project_id = data.get('projectID')
    if projects_collection.find_one({'projectID': project_id}):
        return jsonify({'message': 'Project ID already esixts'}), 400
    projects_collection.insert_one({'projectID': project_id, 'name': name, 'description': description})
    return jsonify({'message': 'Project ID created successfully'}), 201


@app.route('/exist_project', methods=['POST'])
def existing_Project():
    data = request.get_json()
    project_id = data.get('projectID')

    project = projects_collection.find_one({'projectID': project_id})
    if not project:
        return jsonify({'message': 'Invalid Project ID'}), 401
    return jsonify({'message': 'ProjectID log in successfully'}), 200


################################################################################

@app.route('/resource_management')
def resourceManagement():
#Find the capcacity for HW_num1 in the database HW_collection
    availability1 = HW_collection.find_one({'HW_num': 1})
    availability2 = HW_collection.find_one({'HW_num': 2})
    return jsonify({'HW1availability': availability1['avail'], 'HW2availability': availability2['avail']})



# This is to pass the number of each category to the front end
# @app.route('/get_hardware_sets', methods=['GET'])
# def get_hardware_sets():
#     try:
#         # Retrieve hardware sets data from your database
#         hardware_sets = HW_collection.find()
#         # Convert the MongoDB cursor to a list of dictionaries
#         hardware_sets_list = list(hardware_sets)
#         return jsonify(hardware_sets_list)
#     except Exception as e:
#         return jsonify({'error': str(e)})


@app.route('/check_in_hardware', methods=['POST'])
def checkIn_hardware():
    data = request.get_json()
    print(data)
    hw_num = int(data.get('hwID'))
    qty = int(data.get('qty'))
    HW_data = HW_collection.find_one({'HW_num': hw_num})
    print(HW_data)

    if HW_data:
        avail = int(HW_data.get('avail', 0))  # This 0 is just the default if it can't find the keyword avail
        cap = int(HW_data.get('cap', 0))
        new_avail = avail
        if qty <= cap and avail + qty <= cap and qty > 0:
            new_avail = avail + qty
            HW_collection.update_one({'HW_num': hw_num}, {'$set': {'avail': new_avail}})
            return jsonify({'message': f'{qty} hardware checked in. New availability: {new_avail}',"new_avail" :new_avail})
        elif qty <= 0:
            return jsonify({'error': f'Quantity {qty} must be greater than 0', "new_avail" :new_avail}), 400
        else:
            new_avail = avail
            return jsonify({'error': f'Quantity {qty} exceeds the capacity {cap} for hardware {hw_num}', "new_avail" :new_avail}), 400
    else:
        return jsonify({'error': f'Hardware {hw_num} not found'}), 404

# @app.route('/resourceManagement')
# def resourceManagement():
#     data = request.get_json()

@app.route('/check_out_hardware', methods=['POST'])
def checkOut_hardware():
    data = request.get_json()
    hw_num = int(data.get('hwID'))
    qty = int(data.get('qty'))
    HW_data = HW_collection.find_one({'HW_num': hw_num})
    print(HW_data)

    if HW_data:
        avail = int(HW_data.get('avail', 0))  # This 0 is just the default if it can't find the keyword avail
        new_avail = avail
        if qty <= avail and qty > 0:
            new_avail = avail - qty
            HW_collection.update_one({'HW_num': hw_num}, {'$set': {'avail': new_avail}})
            return jsonify({'message': f'{qty} hardware checked out. New avail: {new_avail}',  "new_avail" :new_avail})
        elif qty <= 0:
            return jsonify({'error': f'Quantity {qty} must be greater than 0', "new_avail" :new_avail})
        else:
            return jsonify({'error': f'Quantity {qty} exceeds the availability {avail} for hardware {hw_num}',"new_avail" :new_avail})
    else:
        return jsonify({'error': f'Hardware {hw_num} not found'})



if __name__ == '__main__':
    app.run(debug=True)