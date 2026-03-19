from flask import Blueprint, jsonify, request, render_template, redirect
from bson import ObjectId
from .database import db

views = Blueprint('views', __name__)
emails = db['emails']
passwords = db['passwords']

@views.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@views.route('/checkmailexists', methods=['GET'])
def check_mail_exists():
    mail = request.args.get('mail')
    if emails.find_one({"email": mail}):
        return jsonify({"found": True})
    return jsonify({"found": False})


@views.route('/verifypasswordhash', methods=['GET'])
def verify_password_hash():
    # data = request.get_json()
    data = request.args
    uid = data.get('uid')
    hashed_master_password = data.get('hashed_master_password')
    if emails.find_one({"_id": ObjectId(uid), "hashed_master_password": hashed_master_password}):
        return jsonify({"found": True})
    return jsonify({"found": False})

@views.route('/login', methods=['GET', 'POST'])
def login():

    if request.method == 'POST':

        # data = request.get_json()
        data = request.form
        email = data['email']
        hashed_master_password = data['hashed_master_password']
        if response := emails.find_one({"mail": email, "hashed_master_password": hashed_master_password}):
            data = {"found": True, "uid": str(response['uid'])}
            return render_template('dashboard.html', data=data)
        return render_template('login.html', data={"found": False})
    
    return render_template('login.html')


@views.route('/register', methods=['GET', 'POST'])
def register():

    if request.method == 'POST':

        # data = request.get_json()
        data = request.form
        email = data['email']
        username = data['username']
        hashed_master_password = data['hashed_password']
        user = {
            "email": email,
            "username": username,
            "hashed_master_password": hashed_master_password
        }
        emails.insert_one(user)
        return redirect('/login')
        
    return render_template('register.html')


@views.route('/dashboard', methods=['GET'])
def dashboard():
    return render_template('dashbaord.html')


@views.route('/deregister', methods=['DELETE'])
def deregister():
    data = request.args
    uid = data.get('uid')
    emails.find_one_and_delete({"_id": ObjectId(uid)})


@views.route('/newpasswordstore', methods=['GET', 'POST'])
def new_password_store():
    if request.method == 'POST':
        # data = request.get_json()
        data = request.form
        url = data['url']
        uid = data['uid']
        username = data['username']
        email = data['email']
        encrypted_password = data['password']

        dict = {
            "uid": ObjectId(uid),
            "url": url,
            "username": username,
            "email": email,
            "password": encrypted_password
        }
        passwords.insert_one(dict)
        return redirect('/')
    return render_template('new_password.html')

@views.route('/deletepassword', methods=['DELETE'])
def delete_password():
    # data = request.get_json()
    data = request.args
    uid = ObjectId(data.get('uid'))
    password = data.get('password')
    passwords.find_one_and_delete({"uid": uid, "password": password})
    return redirect('/dashboard')


@views.route('/getallpasswords', methods=['GET'])
def get_all_passwords():
    # data = request.get_json()
    data = request.args
    uid = data.get('uid')
    password_docs = passwords.aggregate([
        {
            '$match': {
                'uid': uid
            }
        }, {
            '$project': {
                '_id': 0, 
                'master_email': 0
            }
        }, {
            '$group': {
                '_id': None, 
                'data': {
                    '$push': '$$ROOT'
                }
            }
        }, {
            '$project': {
                '_id': 0, 
                'data': 1
            }
        }
    ])
    response = list(password_docs)[0]['data']
    return render_template('get_all_passwords.html', data=response)

@views.route('/test', methods=['GET'])
def test():
    print({"_id": ObjectId('69ba81aebbba773ff1947b70')})
    return "Done"
