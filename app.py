from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from play import get_d, is_congress


@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/getlist', methods=['POST'])
def get_list(names):
    data = request.form
    print(data)
    data = set(data)
    list = []
    for d in data:
        if is_congress(d):
            list.append(d)
    return jsonify({'results': list})


@app.route('/congress/<name>', methods=['GET'])
def process_congress(name):
    results = get_d(name)
    return jsonify(results)


if __name__ == '__main__':
    app.run(use_reloader=True)
