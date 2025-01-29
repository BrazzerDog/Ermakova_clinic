from flask import Flask, jsonify, render_template, url_for
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from routes import api

app = Flask(__name__, static_url_path='/static')
CORS(app)

app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///clinic.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600

jwt = JWTManager(app)
db.init_app(app)

# Простая главная страница
@app.route('/')
def index():
    return render_template('index.html')

# API маршруты
app.register_blueprint(api, url_prefix='/api')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True) 