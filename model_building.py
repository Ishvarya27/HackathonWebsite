import random
import numpy as np
import json
import pickle
intents=json.loads(open("C://Users//archa//OneDrive//Desktop//WebItLikeSpyder//intents.json").read())
words=[]
labels=[]
final_x=[]
final_y=[]
for dictionary in intents['intents']:
    words=[]
    for pattern in dictionary['patterns']:
        pattern=pattern.replace('!'," ").replace("."," ").replace(","," ").replace("?"," ")
        temp=(pattern.lower()).split()
        words.extend(temp)
    final_x.append(words)
    final_y.append(dictionary['tag'])
