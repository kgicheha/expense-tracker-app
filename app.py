from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
db = SQLAlchemy(app)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.String(20), nullable=False)

@app.route('/expenses', methods=['GET', 'POST'])
def expenses():
    if request.method == 'GET':
        expenses = Expense.query.all()
        return jsonify([expense.__dict__ for expense in expenses])

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

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)