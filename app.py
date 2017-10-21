from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify


app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.route('/')
def dashboard():
    return render_template('dashboard.html')


@app.route('/congress/<name>', methods=['GET'])
def process_congress(name):
    return jsonify({'name': name})


if __name__ == '__main__':
    app.run(use_reloader=True)
