import React, { useState } from "react";
import "./App.css";

function App() {
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [chestPainType, setChestPainType] = useState("");
    const [restingBP, setRestingBP] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const features = [parseInt(age), parseInt(sex), parseInt(chestPainType), parseInt(restingBP)];

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ features }),
            });

            const data = await response.json();

            if (data.cardiac_arrest_chance) {
                setResult(`Chances of Cardiac Arrest: ${data.cardiac_arrest_chance}`);
            } else {
                setResult("Error in prediction. Please try again.");
            }
        } catch (error) {
            setResult("Error connecting to the server.");
        }
    };

    return (
        <div className="App">
            <h1>Heart Disease Prediction</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sex (1 = Male, 0 = Female):</label>
                    <input
                        type="number"
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Chest Pain Type (1 to 4):</label>
                    <input
                        type="number"
                        value={chestPainType}
                        onChange={(e) => setChestPainType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Resting Blood Pressure (in mm Hg):</label>
                    <input
                        type="number"
                        value={restingBP}
                        onChange={(e) => setRestingBP(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Predict</button>
            </form>
            {result && <div className="result">{result}</div>}
        </div>
    );
}

export default App;
