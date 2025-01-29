# -*- coding: utf-8 -*-

from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

# Изменим префикс на /api
api = Blueprint('api', __name__, url_prefix='/api')

# Главная страница
@api.route('/')
def index():
    return jsonify({
        "title": "Клиника мануальной терапии",
        "description": "Запись на приём к мануальному терапевту"
    })

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email уже зарегистрирован"}), 400
        
    user = User(
        email=data['email'],
        name=data['name'],
        phone=data['phone']
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    token = create_access_token(identity=user.id)
    return jsonify({"token": token, "user": {"name": user.name, "email": user.email}})

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token, "user": {"name": user.name, "email": user.email}})
    
    return jsonify({"error": "Неверный email или пароль"}), 401

@api.route('/profile')
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({
        "name": user.name,
        "email": user.email,
        "phone": user.phone
    }) 