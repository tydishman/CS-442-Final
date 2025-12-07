import { type FormEvent } from "react";
import { useState } from "react";
import "./App.css";

import type { Schema } from "../amplify/data/resource"; // Type-only import
import { generateClient } from "aws-amplify/data"; // Browser-safe Gen 2 client

// Initialize Gen 2 client (authMode can be "userPool" or "guest" depending on your tutorial)
const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      // Call your Bedrock query through the Gen 2 client
      const { data, errors } = await amplifyClient.queries.askBedrock({
        ingredients: [formData.get("ingredients")?.toString() || ""],
      });

      if (!errors) {
        setResult(data?.body || "No data returned");
      } else {
        console.error(errors);
        setResult("Error generating recipe.");
      }
    } catch (e) {
      console.error(e);
      setResult(`An error occurred: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Meet Your Personal
          <br />
          <span className="highlight">Recipe AI</span>
        </h1>
        <p className="description">
          Type a few ingredients (ingredient1, ingredient2, ...) and generate a new recipe!
        </p>
      </div>

      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            className="wide-input"
            id="ingredients"
            name="ingredients"
            placeholder="Ingredient1, Ingredient2, Ingredient3..."
          />
          <button type="submit" className="search-button">
            Generate
          </button>
        </div>
      </form>

      <div className="result-container">
        {loading ? <p>Loading...</p> : result && <p className="result">{result}</p>}
      </div>
    </div>
  );
}

export default App;
