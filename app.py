from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from play import get_d, is_congress

consumer_secret = 'JhrlYNlZKu8oOpaZP16xh8tmaxyPOJqz6ZFGa5QM3TUD2dVWtI'
consumer_key = 'qXTf2YnuBiCMgj6i8jniAV8WW'
access_token = '395269803-yGLNDGa5VOCywOF9gGRNebtEGYmS8zTR42zKDJww'
access_token_secret = 'TEQHGo8rTEYonFNuwQYgY6TbgApg3CDFS0HT8y1d4YHEU'
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


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
