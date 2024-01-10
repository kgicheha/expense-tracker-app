from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.sqlite'
db = SQLAlchemy(app)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.String(20), nullable=False)

@app.route('/expenses', methods=['GET', 'POST'])
def expenses():

    if request.method == 'GET':
        expenses = Expense.query.all()
        return jsonify([
        {
            "description": "Meternet",
            "amount": 150.00,
            "date": "2021-07-06"
        },
        {
            "description": "SMUD",
            "amount": 100.00,
            "date": "2021-07-06"
        },
    ])
        # return jsonify([expense.__dict__ for expense in expenses])

    if request.method == 'POST':
        data = request.get_json()
        new_expense = Expense(
            description=data['description'],
            amount=data['amount'],
            date=data['date']
        )
        db.session.add(new_expense)
        db.session.commit()
        return jsonify({'message': 'Expense added successfully'})

with app.app_context():
    db.create_all()
    app.run(debug=True)