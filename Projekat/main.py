import datetime
import flask
from flask import Flask, redirect, request, jsonify
from flaskext.mysql import MySQL
import jinja2
import sys
from utils.db_connection import mysql

from blueprints.simple_login import simple_login

app = Flask(__name__, static_url_path="")

app.secret_key = "SECRET_KEY"

UPLOAD_FOLDER = "/static/images"

app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "real_estates"
app.config["MYSQL_DATABASE_HOST"] = "localhost"

mysql.init_app(app)
app.register_blueprint(simple_login)


@app.route('/')
@app.route("/index.html")
def home():   
    return app.send_static_file("index.html")

@app.route('/users', methods=["GET"])
def korisnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user")
    rows = cursor.fetchall()

    return jsonify(rows)

@app.route("/users/<int:id>", methods=["GET"])
def korisnik(id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user WHERE id=%s", (id))
    row = cursor.fetchone()

    return jsonify(row)

@app.route('/users', methods=["POST"])
def dodajKorisnika():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = '''INSERT INTO
    user(last_name, first_name, email, username, passw, type)
    VALUES(%s, %s, %s, %s, %s, %s)'''

    cursor.execute(q, (data["last_name"], data["first_name"], data["email"],
                       data["username"], data["passw"], data['type']))
    db.commit()
    return jsonify({"status": "done"}), 201

@app.route('/users/<int:id>', methods=["PUT"])
def izmeniKorisnika(id):
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE user SET last_name=%s, first_name=%s, email=%s,
    username=%s, passw=%s, type=%s WHERE id=%s'''

    cursor.execute(q, (data["last_name"], data["first_name"], data["email"],
                       data["username"], data["passw"], data['type'], id))
    db.commit()
    
    return ""

@app.route('/users/<int:id>', methods=["DELETE"])
def izbrisiKorisnika(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor2 = db.cursor()
    cursor2.execute("DELETE FROM realestate WHERE user_id=%s", (id, ))
    cursor.execute("DELETE FROM user WHERE id=%s", (id, ))
    db.commit()

    return ""


@app.route("/realestate", methods=["GET"])
def nekretnine():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM realestate")
    rows = cursor.fetchall()  

    return jsonify(rows)


@app.route("/realestate/<int:id>", methods=["GET"])
def nekretnina(id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM realestate WHERE id=%s", (id, ))
    row = cursor.fetchone()

    return jsonify(row)

@app.route("/realestate/<string:rec>", methods=["GET"])
def nekretninaPoNaslovu(rec):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM realestate WHERE title LIKE '%"+rec+"%' ")
    rows = cursor.fetchall()

    return jsonify(rows)

@app.route("/realestate", methods=["POST"])
def dodaj_nekretninu():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()

    q = '''INSERT INTO
    realestate(title, location, price, other_info, image_src, user_id)
    VALUES(%s, %s, %s, %s, %s, %s)'''

    cursor.execute(q, (data["title"], data["location"], data["price"],
                       data["other_info"], data["image_src"], data['user_id']))
    db.commit()
    return jsonify({"status": "done"}), 201

@app.route("/realestate/<int:id>", methods=["DELETE"])
def ukloni_nekretninu(id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM realestate WHERE id=%s", (id, ))
    db.commit()

    return ""

@app.route("/realestate/<int:id>", methods=["PUT"])
def izmeni_nekretninu(id):
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE realestate SET title=%s, location=%s, price=%s,
    other_info=%s, image_src=%s WHERE id=%s'''

    cursor.execute(q, (data["title"], data["location"], data["price"],
                       data["other_info"], data["image_src"], id))
    db.commit()
    
    return ""


app.run("0.0.0.0", 80, threaded=True, debug=True)
