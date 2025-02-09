from flask import Flask, request, jsonify  # Importing required Flask modules
from flask_cors import CORS  # Importing CORS to handle cross-origin requests
from main import main  # Importing the main function from main.py

# Initializing the Flask app
app = Flask(__name__)

# Enabling CORS to allow requests from different origins (frontend)
CORS(app)

# Defining an API endpoint for predictions
@app.route('/predict', methods=['POST'])
def predict():
    """
    This endpoint receives a user ID in the request body,
    calls the `main` function to get predictions, and returns the result as JSON.
    """
    user_id = request.json['userId']  # Extracting user ID from the request
    result = main(user_id)  # Calling the prediction function with the given user ID
    return jsonify(result)  # Returning the prediction as a JSON response

# Running the Flask app
if __name__ == '__main__':
    app.run(debug=True)  # Enabling debug mode for easier development & debugging
