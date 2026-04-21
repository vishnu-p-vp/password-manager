from flask import Blueprint, jsonify, request
from bson import ObjectId
from .database import db

views = Blueprint("views", __name__)
users = db["users"]
passwords = db["passwords"]

# @views.route('/', methods=['GET'])
# def home():
#     return render_template('index.html')


# @views.route("/checkmailexists", methods=["GET"])
# def check_mail_exists():
#     mail = request.args.get("mail")
#     if users.find_one({"email": mail}):
#         return jsonify({"found": True})
#     return jsonify({"found": False})


@views.route("/verifypasswordhash", methods=["GET"])
def verify_password_hash():
    # data = request.get_json()
    data = request.args
    uid = data.get("uid")
    hashed_password = data.get("hashed_password")
    if users.find_one({"_id": ObjectId(uid), "hashed_password": hashed_password}):
        return jsonify({"found": True})
    return jsonify({"found": False})


@views.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username_or_email = data.get("usernameOrEmail")
    hashed_password = data.get("hashedPassword")
    response = users.find_one(
        {
            "$or": [{"username": username_or_email}, {"email": username_or_email}],
            "hashed_password": hashed_password,
        }
    )

    if response is None:
        return jsonify({"uid": ""}), 404
    return jsonify({"uid": str(response["_id"])}), 200


@views.route("/register", methods=["POST"])
def register():

    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    hashed_password = data.get("hashedPassword")
    user = {
        "email": email,
        "username": username,
        "hashed_password": hashed_password,
    }
    users.insert_one(user)
    data = {"status": "registered"}
    return jsonify(data), 200


# @views.route("/dashboard", methods=["GET"])
# def dashboard():
#     return render_template("dashboard.html")


@views.route("/deregister", methods=["DELETE"])
def deregister():
    data = request.args
    uid = data.get("uid")
    try:
        passwords.delete_many({"uid": ObjectId(uid)})
        users.find_one_and_delete({"_id": ObjectId(uid)})
        return jsonify({"status": "deleted"})
    except Exception as e:
        print(e)
        return jsonify({"error": "failed, check logs"}), 500


@views.route("/passwords", methods=["GET", "POST"])
def password():

    if request.method == "POST":
        # data = request.get_json()
        data = request.form
        website = data["url"]
        uid = data["uid"]
        username = data["username"]
        # email = data["email"]
        encrypted_password = data["password"]

        dict = {
            "uid": ObjectId(uid),
            "website": website,
            "username": username,
            # "email": email,
            "password": encrypted_password,
        }
        passwords.insert_one(dict)
        return jsonify({"status": "one password inserted"}), 200

    data = request.args
    uid = data.get("uid")
    password_docs = passwords.aggregate(
        [
            {"$match": {"uid": ObjectId(uid)}},
            {
                "$project": {
                    "_id": 0,
                    "pid": {"$toString": "$_id"},
                    "website": 1,
                    "username": 1,
                    "password": 1,
                }
            },
        ]
    )
    data = password_docs.to_list()
    if len(data) == 0:
        return jsonify({"passwords": []}), 200
    return jsonify({"passwords": data}), 200


@views.route("/passwords/count", methods=["GET"])
def get_password_count():
    uid = request.args.get("uid")
    count = passwords.count_documents({"uid": ObjectId(uid)})
    return jsonify({"count": count}), 200


@views.route("/deletepassword", methods=["DELETE"])
def delete_password():
    # data = request.get_json()
    data = request.args
    pid = ObjectId(data.get("pid"))
    passwords.find_one_and_delete({"_id": pid})
    return jsonify({"status": "one password deleted"})


@views.route("/test", methods=["GET"])
def test():
    print({"_id": ObjectId("69ba81aebbba773ff1947b70")})
    return "Done"
