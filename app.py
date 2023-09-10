from flask import Flask, jsonify, render_template, request
import random
import model_building as mb
app = Flask(__name__)

def getResponse(s):
    s=s.replace('!'," ").replace("."," ").replace(","," ").replace("?"," ")
    l=s.split()
    ll=sorted(l,key=len)
    ll.reverse()
    for i in ll:
        for j in mb.final_x:
            if i in j:
                tag_found=mb.final_y[mb.final_x.index(j)]
                for k in mb.intents['intents']:
                    if(k["tag"]==tag_found):
                        return (random.choice(k["responses"]))
                       
    return("Sorry! I'm not able to get what you are trying to convey")


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')
@app.route('/get_response', methods=['POST'])
def get_response():
    data = request.json  # Get JSON data from the request
    input_string = data['input']

    # Perform some processing in Python
    response_string = getResponse(input_string.lower())

    return jsonify( response_string)
if __name__ == '__main__':
    app.run(debug=True)
