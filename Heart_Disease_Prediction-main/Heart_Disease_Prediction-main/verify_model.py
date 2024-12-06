import pickle
import os

file_path = 'stacked_model.pkl'  # Ensure this is the correct path to your pickle file

try:
    # Check if file exists
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
    else:
        # Open the file and verify its contents
        with open(file_path, 'rb') as file:
            print("Reading pickle file...")
            model = pickle.load(file)  # Attempt to load the model
            print("Pickle file loaded successfully.")
            print("Model type:", type(model))
except pickle.UnpicklingError:
    print("Error: The file is not a valid pickle file or it is corrupted.")
except Exception as e:
    print(f"Unexpected error: {e}")
