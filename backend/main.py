import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import requests
import json

# Fetch data from APIs
def fetch_data(url):
    """
    Fetch data from a given API endpoint and return it as JSON.
    """
    response = requests.get(url)
    return json.loads(response.text)

# Fetching required datasets from external sources
current_quiz_data = fetch_data('https://www.jsonkeeper.com/b/LLQT')  # Data from the latest quiz attempts
historical_quiz_data = fetch_data('https://api.jsonserve.com/rJvd7g')  # Past quiz performance data
neet_results = fetch_data('https://api.jsonserve.com/XgAgFJ')  # Past NEET exam results data

# Process current quiz data
def process_current_quiz(data):
    """
    Processes the current quiz data to extract topic-wise performance,
    including difficulty level, accuracy, and question count.
    """
    df = pd.DataFrame(data['questions'])

    # Determine if the selected option is correct
    df['correct'] = df.apply(lambda row: row['selectedOptionId'] == row['correctOptionId'], axis=1)

    # Aggregate data based on topic
    return df.groupby('topic').agg({
        'difficulty': 'mean',   # Average difficulty per topic
        'correct': 'mean',      # Accuracy percentage
        'id': 'count'           # Number of questions attempted
    }).reset_index()

# Process historical quiz data
def process_historical_quiz(data):
    """
    Processes historical quiz data by calculating scores, accuracy, 
    and performance trends for each user.
    """
    df = pd.DataFrame(data)

    # Calculate the number of correct answers for each user
    df['correct_count'] = df['responseMap'].apply(
        lambda x: sum(1 for k, v in x.items() if v == x.get(f"{k}_correct"))
    )

    # Calculate total questions attempted and accuracy
    df['total_questions'] = df['responseMap'].apply(len)
    df['accuracy'] = df['correct_count'] / df['total_questions']

    # Aggregate data per user
    return df.groupby('userId').agg({
        'score': 'mean',    # Average quiz score
        'accuracy': 'mean'  # Average accuracy
    }).reset_index()

# Combine data and prepare for model training
def prepare_data(current, historical, neet):
    """
    Combines current quiz data, historical quiz data, and NEET results
    to create a dataset for training the model.
    """
    current_summary = process_current_quiz(current)  # Process current quiz data
    historical_summary = process_historical_quiz(historical)  # Process past quiz data

    neet_df = pd.DataFrame(neet)  # Convert NEET results to DataFrame

    # Merge historical quiz data with NEET exam results using userId
    combined = pd.merge(historical_summary, neet_df, on='userId')

    return combined

# Train machine learning model
def train_model(data):
    """
    Trains a Random Forest Regressor model using quiz scores and accuracy 
    to predict ranks.
    """
    X = data[['score', 'accuracy']]  # Features (quiz score and accuracy)
    y = data['rank']  # Target variable (NEET rank)

    # Split data into training and test sets (80-20 split)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train RandomForest model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    return model

# Predict rank for a user
def predict_rank(model, user_data):
    """
    Uses the trained model to predict the rank for a given user's quiz data.
    """
    return model.predict(user_data)[0]  # Return the predicted rank

# Generate insights based on user performance
def generate_insights(current_quiz, historical_quizzes):
    """
    Generates insights including weak areas, improvement trends, 
    and overall accuracy.
    """
    current_summary = process_current_quiz(current_quiz)
    historical_summary = process_historical_quiz(historical_quizzes)

    # Identify weak areas (topics where accuracy is less than 60%)
    weak_areas = current_summary[current_summary['correct'] < 0.6]['topic'].tolist()

    # Determine improvement trend (increase or decrease in accuracy over time)
    improvement_trend = historical_summary['accuracy'].diff().mean()

    return {
        'weak_areas': weak_areas,
        'improvement_trend': 'Improving' if improvement_trend > 0 else 'Declining',
        'overall_accuracy': historical_summary['accuracy'].mean()
    }

# Main function to predict rank and generate insights for a given user
def main(user_id):
    """
    Main function that fetches user data, trains the model, 
    makes a prediction, and generates insights.
    """
    combined_data = prepare_data(current_quiz_data, historical_quiz_data, neet_results)  # Prepare dataset
    model = train_model(combined_data)  # Train model

    # Extract user-specific data for prediction
    user_data = combined_data[combined_data['userId'] == user_id]

    # Predict rank based on user's quiz scores and accuracy
    predicted_rank = predict_rank(model, user_data[['score', 'accuracy']])

    # Generate additional insights for the user
    insights = generate_insights(current_quiz_data, historical_quiz_data)

    return {
        'predicted_rank': int(predicted_rank),  # Convert rank to integer
        'insights': insights  # Include insights
    }

# Example usage: Running the script for a test user
if __name__ == "__main__":
    user_id = "user1"  # Replace with actual user ID
    result = main(user_id)
    print(json.dumps(result, indent=2))  # Print the prediction and insights in readable format
