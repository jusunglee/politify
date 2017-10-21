from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from flask_cors import CORS
from play import get_d, is_congress

app = Flask(__name__)
CORS(app)



@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/getlist', methods=['POST'])
def get_list():
    data = dict(request.form)['list[]']
    print(data)
    data = set(data)
    list = []
    for d in data:
        if is_congress(d.lower()):
            list.append(d)
    print(list)
    return jsonify({'results': list})


@app.route('/congress/<name>', methods=['GET'])
def process_congress(name):
    results = get_d(name)
    return jsonify(results)


if __name__ == '__main__':
    app.run(use_reloader=True)
