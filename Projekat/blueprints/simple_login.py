import flask
from flask import Blueprint, request, session, jsonify

from utils.db_connection import mysql

simple_login = Blueprint("simple_login", __name__)


@simple_login.route("/login", methods=["POST"])
def loginFunction():
    login_user = request.json
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user WHERE username=%s AND passw=%s", (login_user["username"], login_user["passw"]))
    user = cursor.fetchone()

    if user is not None:
        session["user"] = user
        return jsonify({"success": True})

    return jsonify({"success": False})

@simple_login.route('/isLoggedIn', methods=["GET"])
def isLoggedIn():
    return jsonify(session.get('user') is not None)

@simple_login.route('/checkAdmin', methods=["GET"])
def checkAdmin():
    if session.get('user') is not None:
        return jsonify(session.get('user')['type'])
    else:
        return "No active user", 404

@simple_login.route('/loggedInAsUser', methods=["GET"])
def loggedInAsUser():
    if session.get('user') is not None:
        login_user = request.json
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM user WHERE id=%s", (session.get('user')['id']))
        user = cursor.fetchone()

        return flask.jsonify(user)
    else:
        return "No active user", 404

@simple_login.route('/logout', methods=['GET'])
def logOut():
    session.pop('user', None)
    return jsonify({"success": True})