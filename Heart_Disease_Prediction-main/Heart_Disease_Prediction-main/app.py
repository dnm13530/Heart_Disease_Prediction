import os
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify, render_template, send_from_directory
import joblib
from flask_cors import CORS
from sklearn.metrics import classification_report

app = Flask(__name__, static_folder='public', template_folder='public')
CORS(app)  # Allow all origins by default

# Load the trained model
model = joblib.load(r'C:\Users\Manvitha HarishBabu\Documents\heart-disease-prediction\Heart_Disease_Prediction-main\Heart_Disease_Prediction-main\stacked_model.pkl')

# Home route - serves the React app
@app.route('/', methods=['GET'])
def home():
    return send_from_directory(os.path.join(app.root_path, 'public'), 'index.html')

# Individual prediction route (Handles POST request)
@app.route('/individual', methods=['POST'])
def individual_predict():
    try:
        # Get JSON data from the frontend (React)
        data = request.get_json()
        
        if len(data) != 4:   # Ensure there are 4 features
            return jsonify({"error": "Please provide 4 features: age, sex, chestPainType, restingBP"}), 400
        
        # Features from the incoming request
        features = np.array(data).reshape(1, -1)
        
        # Prediction and probability
        prediction = model.predict(features)
        probability = model.predict_proba(features)
        
        # Return the result
        return jsonify({
            "prediction": int(prediction[0]),
            "cardiac_arrest_chance": f"{probability[0][1]*100:.2f}%"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Bulk prediction route (Handles file upload)
@app.route('/bulk', methods=['POST'])
def bulk_predict():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Read CSV file into a pandas DataFrame
        data = pd.read_csv(file)

        # Check for required columns
        required_columns = ['age', 'sex', 'chestPainType', 'restingBP']
        if not all(col in data.columns for col in required_columns):
            missing_cols = [col for col in required_columns if col not in data.columns]
            return jsonify({"error": f"Missing required columns: {missing_cols}"}), 400

        # Extract features and predict
        features = data[required_columns]
        predictions = model.predict(features)
        probabilities = model.predict_proba(features)[:, 1]

        # Add predictions to the DataFrame
        data['prediction'] = predictions
        data['cardiac_arrest_chance'] = probabilities * 100

        # Generate classification report if 'target' column is available
        report = {}
        if 'target' in data.columns:
            report = classification_report(data['target'], predictions, output_dict=True)

        # Return the predictions and classification report
        return jsonify({
            "predictions": data.to_dict(orient='records'),
            "classification_report": report
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Serve static files (React build files like JS, CSS, images)
@app.route('/src/<path:path>')
def send_static(path):
    return send_from_directory(os.path.join(app.root_path, 'public', 'src'), path)

# Catch-all route to serve the React index.html for all other paths
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(os.path.join(app.root_path, 'public'), 'index.html')

if __name__ == "__main__":
    app.run(debug=True)
