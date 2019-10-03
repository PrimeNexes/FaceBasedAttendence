from cv2 import cv2
from face_detection import face
from keras.models import load_model
import numpy as np
from embedding import emb

import sys
#from retreive_pymongo_data import database

label=None
people={0:"sheldon",1:"Ben"}
abhi=None
e=emb()
fd=face()
model=load_model('face_reco2.MODEL',compile=False)
sys.stdout.write("Loading .....")

def test():
    run=cv2.imread('python/tempReg/0.jpg',1)
    run=cv2.resize(run,(160,160))
    #run=np.rollaxis(run,2,0)
    run=run.astype('float')/255.0
    run=np.expand_dims(run,axis=0)
    run=e.calculate(run)
    run=np.expand_dims(run,axis=0)
    prediction = model.predict(run)[0]
    result = int(np.argmax(prediction))
    if(np.max(prediction)>.70):
        label=people[result]
    else:
        label = 'unknown'
    print(label)
sys.stdout.write("Recognising .....")
test()