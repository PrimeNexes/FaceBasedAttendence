from cv2 import cv2
from face_detection import face
from keras.models import load_model
import numpy as np
from embedding import emb
from PIL import Image
from matplotlib import pyplot
from numpy import savez_compressed
from numpy import asarray
import os

import sys
#from retreive_pymongo_data import database

year = sys.argv[1]
className = sys.argv[2]
label=None
#people={0:"Sheldon",1:"Ben",2:"Elton",3:"Jerry",4:"Madona"}
people= sys.argv[3].split(',')
abhi=None
e=emb()
fd=face()
model=load_model('python/model/'+year+'_'+className+'_face_reco.MODEL',compile=False)

def test():
		recog=os.listdir('python/recogCache/'+year+'/'+className)
		for x in recog:
			run=cv2.imread('python/recogCache/'+year+'/'+className+'/'+x,1)
			run=cv2.resize(run,(160,160))
			run=run.astype('float')/255.0
			run=np.expand_dims(run,axis=0)
			run=e.calculate(run)
			run=np.expand_dims(run,axis=0)
			prediction = model.predict(run)[0]
			result = int(np.argmax(prediction))
			if(np.max(prediction)>.80):
				try:
				    label = people[result]
				except IndexError:
					label = 'unknown'
			else:
				label = 'unknown'
			print(label+ ': ', np.max(prediction))

test()