"use client";

import type React from "react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Interface for prediction results

interface Prediction {
  predicted_rank: number;
  
  insights: {
    weak_areas: string[];
    improvement_trend: string;
    overall_accuracy: number;
  };
}
// Sample user data containing scores and accuracy
const userData = {
  user1: { score: 75, accuracy: 0.8 },
  user2: { score: 65, accuracy: 0.7 },
  user3: { score: 85, accuracy: 0.9 },
  student001: { score: 70, accuracy: 0.75 },
  student002: { score: 80, accuracy: 0.85 },
};

// Mapping of weak subject areas for each user
const weakAreas = {
  user1: ["Physics", "Organic Chemistry"],
  user2: ["Biology", "Inorganic Chemistry"],
  user3: ["Mathematics", "Physical Chemistry"],
  student001: ["Botany", "Zoology"],
  student002: ["Mechanics", "Thermodynamics"],
};

const App: React.FC = () => {
  const [userId, setUserId] = useState("");     // State to store user input
  const [prediction, setPrediction] = useState<Prediction | null>(null);    // State to store prediction results

   // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId in userData) {
      const user = userData[userId];
      const predictedRank = Math.floor(10000 * (1 - user.accuracy));    // Calculate predicted rank
      setPrediction({
        predicted_rank: predictedRank,
        insights: {
          weak_areas: weakAreas[userId],
          improvement_trend: user.score > 70 ? "Improving" : "Needs improvement",
          overall_accuracy: user.accuracy,
        },
      });
    } else {
      alert("User not found. Please try a valid user ID.");   // Show alert if user ID is invalid
    }
  };

  return (
    <div className="flex flex-grow flex-col w-full h-full items-center justify-center bg-gray-100 p-6">
      {/* Main Card Container */}
      <Card className="w-full max-w-md text-center">
          {/* Card Header with Title */}
          <CardHeader className="bg-blue-600 text-white text-3xl font-bold text-center py-4 rounded-t-lg justify-center items-center">
            <CardTitle>Student Rank Predictor</CardTitle>
          </CardHeader>
          {/* Card Content */}
          <CardContent>
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-2 bg-slate-400">
              <div className="flex-row">
                  <Label htmlFor="userId" className="font-bold text-xl">Enter User ID</Label>
                  <Input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="e.g., user1, student001"
                  />
                  <p className="text-sm text-gray-400">Sample IDs: <b>user1, user2, user3, student001, student002</b></p>
                  <Button type="submit" className="">Predict Rank</Button>
              </div>
            </form>
            
             {/* Display Prediction Results if Available */}
            {prediction && (
              <div className="mt-6 p-5 bg-gray-50 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Prediction Results</h2>
                <p><b>Predicted Rank:</b> {prediction.predicted_rank}</p>
                 {/* Insights Section */}
                <h3 className="text-md font-semibold mt-4">Insights</h3>
                <p><b>❌ Weak Areas:</b> {prediction.insights.weak_areas.join(", ")}</p>
                <p><b>📈 Improvement Trend:</b> {prediction.insights.improvement_trend}</p>
                <p><b>🎯 Overall Accuracy:</b> {(prediction.insights.overall_accuracy * 100).toFixed(2)}%</p>
                <h3 className=" text-2xl font-semibold mt-6">📊 Performance Trend: </h3>
                {/* Performance Trend Line Chart */}
                <LineChart width={500} height={300} data={[
                  { name: "Quiz 1", accuracy: prediction.insights.overall_accuracy - 0.2 },
                  { name: "Quiz 2", accuracy: prediction.insights.overall_accuracy - 0.15 },
                  { name: "Quiz 3", accuracy: prediction.insights.overall_accuracy - 0.1 },
                  { name: "Quiz 4", accuracy: prediction.insights.overall_accuracy - 0.05 },
                  { name: "Quiz 5", accuracy: prediction.insights.overall_accuracy },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </div>
            )}
        </CardContent>
      </Card>

      {/* Footer Section */}
      <footer className="text-center text-cyan-950 p-4 mt-8">© {new Date().getFullYear()} Kartika Kannojiya. All rights reserved.</footer>

    </div>
  );
};

export default App;
