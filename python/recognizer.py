from cv2 import cv2
from face_detection import face
from keras.models import load_model
import numpy as np
from embedding import emb
from PIL import Image
from matplotlib import pyplot
from numpy import savez_compressed
from numpy import asarray
from mtcnn.mtcnn import MTCNN
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



def extract_face(filename, required_size=(160, 160)):
	# load image from file
	image = Image.open(filename)
	# convert to RGB, if needed
	image = image.convert('RGB')
	# convert to array
	pixels = asarray(image)
	# create the detector, using default weights
	detector = MTCNN()
	# detect faces in the image
	results = detector.detect_faces(pixels)
	# extract the bounding box from the first face
	x1, y1, width, height = results[0]['box']
	# bug fix
	x1, y1 = abs(x1), abs(y1)
	x2, y2 = x1 + width, y1 + height
	# extract the face
	face = pixels[y1:y2, x1:x2]
	# resize pixels to the model size
	image = Image.fromarray(face)
	image = image.resize(required_size)
	face_array = asarray(image)
	return face_array

def test():
		recog=os.listdir('python/recogCache/'+year+'/'+className)
		for x in recog:
			run=extract_face('python/recogCache/'+year+'/'+className+'/'+x)
			# run=cv2.resize(run,(160,160))
			#run=np.rollaxis(run,2,0)
			run=run.astype('float')/255.0
			run=np.expand_dims(run,axis=0)
			run=e.calculate(run)
			run=np.expand_dims(run,axis=0)
			prediction = model.predict(run)[0]
			result = int(np.argmax(prediction))
			if(np.max(prediction)>.95):
				label=people[result]
			else:
				label = 'unknown'
			print(label+ ': ', np.max(prediction))

test()