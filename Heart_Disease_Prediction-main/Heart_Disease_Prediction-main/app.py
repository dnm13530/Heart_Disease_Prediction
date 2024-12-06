import numpy as np
from flask import Flask, request, jsonify
import joblib  # Corrected import
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will allow all origins by default

# Load your trained model here
model = joblib.load(r'C:\Users\Manvitha HarishBabu\Documents\heart-disease-prediction\Heart_Disease_Prediction-main\Heart_Disease_Prediction-main\stacked_model.pkl')

@app.route('/', methods=['GET'])
def home():
    return "Heart Disease Prediction API is running. Use the /predict endpoint for predictions."

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = data.get('features', [])
        
        if len(features) != 4:
            return jsonify({"error": "Please provide 4 features for prediction."}), 400

        # Reshape and make prediction
        features_array = np.array(features).reshape(1, -1)
        prediction = model.predict(features_array)
        probability = model.predict_proba(features_array)

        # Return formatted response
        return jsonify({
            "cardiac_arrest_chance": f"{probability[0][1]*100:.2f}%"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
