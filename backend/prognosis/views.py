# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from requests.exceptions import HTTPError
from rest_framework.decorators import api_view
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials, firestore
from tensorflow.keras.models import load_model
import numpy as np
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from PIL import Image
import cv2
import datetime
import base64
import google.generativeai as genai
from google.generativeai.types.generation_types import StopCandidateException


cred = credentials.Certificate("prognosis/firebase/serviceaccount.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

genai.configure(api_key="")


@csrf_exempt
@api_view(['POST'])
def dashboard(request):
    if request.method == 'POST':
        try:
            user_id = request.data.get('user_id')
            user_ref = db.collection('users').document(user_id).get()

            user_data = user_ref.to_dict()
            name = user_data.get('name')
            age = user_data.get('age')
            email = user_data.get('email')
            
            
            # Check if Cataract has been detected for the user
            cataract_detected = is_disease_detected(user_id, 'Cataract')
            # Check if Diabetic Retinopathy has been detected for the user
            diabetic_retinopathy_detected = is_disease_detected(user_id, 'Diabetic Retinopathy')
            # Check if Glaucoma has been detected for the user
            glaucoma_detected = is_disease_detected(user_id, 'Glaucoma')
            # Check if Other has been detected for the user
            other_detected = is_disease_detected(user_id, 'Other')

            
            #Calculate eye health risk based on disease occurrences and user's age
            eye_health_risk, eye_health_status = calculate_eye_health_risk(cataract_detected, diabetic_retinopathy_detected, glaucoma_detected, other_detected, age)
            
            # Create response data
            response_data = {
                'name': name,
                'age': age,
                'email': email,
                'eye_health_risk': eye_health_risk,
                'eye_health_status': eye_health_status
            }
            
            # Send response
            return Response(response_data)
        
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Method Not Allowed'}, status=405)

def is_disease_detected(user_id, disease):
    # Query Firestore to check if any prediction with the specified disease exists for the user
    query = db.collection('users').document(user_id).collection('predictions').where('disease', '==', disease).limit(1).get()
    # If any prediction with the specified disease exists, return True, else return False
    return bool(query)
    
def calculate_eye_health_risk(cataract_detected, diabetic_retinopathy_detected, glaucoma_detected, other_detected, user_age):
    # Initialize weights for different diseases based on age
    user_age = int(user_age)
    if user_age <= 30:
        cataract_weight = 0.3
        diabetic_retinopathy_weight = 0.2
        glaucoma_weight = 0.2
        other_weight = 0.1
    elif user_age <= 50:
        cataract_weight = 0.4
        diabetic_retinopathy_weight = 0.3
        glaucoma_weight = 0.2
        other_weight = 0.1
    else:
        cataract_weight = 0.5
        diabetic_retinopathy_weight = 0.3
        glaucoma_weight = 0.1
        other_weight = 0.1
    
    # Calculate the total score based on the detected diseases
    eye_health_risk = (cataract_detected * cataract_weight +
                   diabetic_retinopathy_detected * diabetic_retinopathy_weight +
                   glaucoma_detected * glaucoma_weight +
                   other_detected * other_weight)
    
    print(eye_health_risk)
    # Determine the eye health status based on the total score
    if eye_health_risk == 0:
        eye_health_status = "Healthy"
    elif eye_health_risk < 0.3:
        eye_health_status = "Moderate"
    else:
        eye_health_status = "Unhealthy"
    return eye_health_risk, eye_health_status
    
@csrf_exempt
@api_view(['POST'])
def eyedisease(request):
    CLASSES = {0: 'Cataract', 1: 'Diabetic Retinopathy', 2:'Glaucoma', 3: 'Normal', 4: 'Other'}
    disease_descriptions = {
        0: 'Your eyes are affected by Cataract, it causes clouding to the lens, leading to blurred vision and eventual loss of sight.',
        1: 'Your eyes are affected by Diabetic Retinopathy, it causes by diabetes characterized by damage to the blood vessels in the retina, leading to vision impairment or blindness.',
        2: 'Your eyes are affected by Glaucoma, it causes by increased pressure within the eye, which can damage the optic nerve and result in vision loss or blindness.',
        3: 'Your eyes are in healthy condition',
        4: 'Your eyes are affected by some other kind of disease.'
    }

    if request.method == 'POST':
        try:
            user_id = request.POST.get('user_id')
            # Get the image file from the request
            image_file = request.FILES.get('image')
            
            # Load the image using PIL
            image = Image.open(image_file)
            
            # Preprocess the image
            image = image.resize((150, 150))
            img_batch = np.array(image)
            img_batch = np.expand_dims(img_batch, axis=0)
    
            # Load the eye disease model
            model = load_model("prognosis/models/final.h5")

            # Make prediction
            prediction = model.predict(img_batch)
            predicted_class_index = np.argmax(prediction[0])
            confidence_score = prediction[0][predicted_class_index]
            print(confidence_score)
            
            predicted_class_name = CLASSES[predicted_class_index]
            description = disease_descriptions[predicted_class_index]
            
            # Encode the image to base64
            image_file.seek(0)
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
            current_date = datetime.datetime.now().strftime('%Y-%m-%d')
            prediction_data = {
                'disease': predicted_class_name,
                'description': description,
                'date': current_date,
                'image': encoded_image
            }
            
            # Save prediction data to Firestore
            db.collection('users').document(user_id).collection('predictions').add(prediction_data)
            
            # Close the image file
            image_file.close()
            
            return Response({'prediction': predicted_class_name, 'desc': description})
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Method Not Allowed'}, status=405)

@csrf_exempt
@api_view(['POST'])
def history(request):
    if request.method == 'POST':
        try:
            user_id = request.data.get('user_id') 
            user_predictions = db.collection('users').document(user_id).collection('predictions').stream()
            prediction_history = []

            # Extract prediction data
            for prediction in user_predictions:
                prediction_data = prediction.to_dict()
                prediction_history.append(prediction_data)
            
            return Response({'prediction_history': prediction_history})
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    return Response({'error': 'Method Not Allowed'}, status=405)
@csrf_exempt
@api_view(['POST'])
def chat(request):
    if request.method == 'POST':
        try:
            text = request.data.get('message')
            model = genai.GenerativeModel("gemini-pro")
            
            if text.lower() == "hi" or text.lower() == "hello":
                response = model.generate_content(f"{text}")
            else:
                topic = model.generate_content(f"{text} -- is this a health related or non-health related topic?  answer in strictly one word ")
                if topic.text == "Health":
                    response = model.generate_content(f"prompt = \'{text}\' . small description about prompt without title")
                else:
                    response = model.generate_content("Say something like this is beyond my capabilities and I can't reply to non-eye health related data")       

            response_data = {
                "response": response.text, 
            }
            return Response({"data": response_data})
        except StopCandidateException as e:
            print(f"StopCandidateException raised: {e}")
            return Response({"error": "An error occurred while processing your request."}, status=500)
    
    return Response({'error': 'Method Not Allowed'}, status=405)
