# Student Rank Predictor

## 📌 About the Project
The **Student Rank Predictor** is a machine learning-based web application that analyze quiz performance and predict student rank based on performance data and provides detailed insights into their academic progress.

## 🚀 Features
- 📊 **Rank Prediction** based on historical data and machine learning models.
- 📈 **Performance Analysis** Visualize student performance trends over time.
- **Insight Generation**: Identify weak areas and improvement trends.
- 🏆 **Comparison with Peers**.
- 🔍 **Data Visualization** with charts and graphs.

## 🛠 Tech Stack
**Frontend**:

- Next.js 14: React Framework

- TypeScript : Programming Language

- Tailwind CSS : Styling

- Recharts : Charting Library

**Backend**:

- Flask API: Handles rank prediction requests and serves results
- Machine Learning Model: Utilizes Random Forest for rank prediction based on quiz and NEET performance data
- Data Processing: Aggregates historical and real-time quiz performance for trend analysis
- REST API Integration: Fetches and processes quiz and NEET result data from external sources
- Scikit-learn : Machine learning library
- Pandas : Data processing library
- NumPy : Numerical computing

📖 Approach Description

The Student Rank Predictor applies a machine learning approach to analyze students' quiz and NEET performance data. The system:

- Collects User Data: Inputs include quiz scores, accuracy levels, and historical trends.
- Processes Data: Aggregates the data to compute a performance score.
- Predicts Rank: Uses a Random Forest Model trained on past student performances to estimate a predicted rank.
- Generates Insights: Identifies weak subject areas and trends based on performance fluctuations.
- Visualizes Trends: Displays improvement patterns using interactive charts.

## 📡 API Demonstration

The Flask backend provides an API endpoint for rank prediction. Below is an example usage:
### Endpoint:
```bash
  POST /predict-rank
```
### Sample Input (JSON):
```bash
  {
  "user_id": "student001",
  "quiz_scores": [70, 75, 80, 85],
  "accuracy": 0.75
 }
```
### Sample Output (JSON):
```bash
  {
  "predicted_rank": 2500,
  "insights": {
    "weak_areas": ["Botany", "Zoology"],
    "improvement_trend": "Improving",
    "overall_accuracy": 75.0
  }
 }
```
### Logic & Recommendations:

- The model evaluates the accuracy score and predicts a probable NEET rank.
- Weak subject areas are determined from a predefined dataset based on quiz performance.
- If accuracy improves over time, the trend is marked as "Improving"; otherwise, it suggests "Needs Improvement".
- Users are advised to focus on weak areas to enhance performance

## 📷 Screenshots
| Homepage  | Rank Prediction |
|-----------|----------------|
|![Screenshot 2025-02-10 010413](https://github.com/user-attachments/assets/151cc3f8-df8a-4ee6-91db-a69b2ecf51ce) | ![Screenshot 2025-02-10 010444](https://github.com/user-attachments/assets/5beee22e-8123-48c4-b8e9-f9e5c85b4150) |

## 🏗 Installation

### Frontend setup :
### Clone the Repository
```bash
 git clone https://github.com/kartika-k/Student-Rank-Predictor.git
 cd student-rank-predictor
```
### Install dependencies:
```bash
  npm install
```
### Run the development server:
```bash
  npm run dev
  #or
  npm start
```
Open http://localhost:3000 in your browser

### Backend Setup:
1. Navigate to the backend folder:
   ```bash
    cd backend
   ```
2. Install Dependencies
   ```bash
     pip install -r requirements.txt 
   ```
3. Install required Python packages:
   ```bash
    pip install flask flask-cors pandas numpy scikit-learn requests
   ```
4. Run the Flask API server:
   ```bash
    python app.py
   ```
## 🎯 Usage
1. Enter a valid User ID (e.g., user1, student001).
2. Click "Predict Rank" to generate predictions.
3. View:
  - Predicted rank
  - Weak areas
  - Performance trends

## 📈 Sample Data :
```bash
const userData = {
  user1: { score: 75, accuracy: 0.8 },
  user2: { score: 65, accuracy: 0.7 },
};
```
## 🤝 Contribution Guidelines
1. Fork the repository.
2. Create a new branch 
3. Commit & push changes
5. Open a Pull Request.

## 📜 License
This project is licensed under the **MIT License**.

## 🌎 Connect with Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/kartika-k2810/)  [![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/kartika-k)

⭐ **Star this repository if you found it useful!** ⭐

