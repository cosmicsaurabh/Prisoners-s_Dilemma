import React, { useState } from 'react';
import algorithms from '../algorithms';
import PrisonersDilemma from '../PrisonersDilemma';
import '../styles/styles.css'; // Import the stylesheet

const Game = () => {
  const [algorithm1, setAlgorithm1] = useState('RAND');
  const [algorithm2, setAlgorithm2] = useState('RAND');
  const [iterations, setIterations] = useState(3);
  const [results, setResults] = useState([]);

  const startGame = () => {
    const prisonersDilemma = new PrisonersDilemma({ algorithm1, algorithm2 });
    const results = [];
    let previousScore1 = 0;
    let previousScore2 = 0;

    for (let i = 0; i < iterations; i++) {
      prisonersDilemma.next();
      const currentScore1 = prisonersDilemma.prisoner1.score;
      const currentScore2 = prisonersDilemma.prisoner2.score;

      results.push({
        iteration: i + 1,
        score1: currentScore1,
        move1: prisonersDilemma.prisoner1.history[i] ? 'Cooperate' : 'Defect',
        scoreChange1: currentScore1 - previousScore1,
        score2: currentScore2,
        move2: prisonersDilemma.prisoner2.history[i] ? 'Cooperate' : 'Defect',
        scoreChange2: currentScore2 - previousScore2,
      });

      previousScore1 = currentScore1;
      previousScore2 = currentScore2;
    }

    setResults(results);
  };

  const calculateAverageScoreChange = (results) => {
    if (results.length === 0) return { avgScoreChange1: 0, avgScoreChange2: 0 };

    const totalScoreChange1 = results.reduce((acc, result) => acc + result.scoreChange1, 0);
    const totalScoreChange2 = results.reduce((acc, result) => acc + result.scoreChange2, 0);

    const avgScoreChange1 = totalScoreChange1 / results.length;
    const avgScoreChange2 = totalScoreChange2 / results.length;

    return { avgScoreChange1, avgScoreChange2 };
  };

  const { avgScoreChange1, avgScoreChange2 } = calculateAverageScoreChange(results);

  return (
    <div className="game-container">
      <h2>Prisoner's Dilemma</h2>
      <div className="controls">
        <label>
          Algorithm 1:
          <select value={algorithm1} onChange={(e) => setAlgorithm1(e.target.value)}>
            {Object.keys(algorithms).map((key) => (
              <option key={key} value={key}>{algorithms[key].name}</option>
            ))}
          </select>
        </label>
        <label>
          Algorithm 2:
          <select value={algorithm2} onChange={(e) => setAlgorithm2(e.target.value)}>
            {Object.keys(algorithms).map((key) => (
              <option key={key} value={key}>{algorithms[key].name}</option>
            ))}
          </select>
        </label>
        <label>
          Iterations:
          <input type="number" value={iterations} onChange={(e) => setIterations(parseInt(e.target.value, 10))} />
        </label>
        <button onClick={startGame}>Start Game</button>
      </div>
      <h3>Scoring Pattern</h3>
      <div className="scoring-pattern">
        <p><strong>Cooperate, Cooperate:</strong> 3, 3</p>
        <p><strong>Cooperate, Defect:</strong> 5, 0</p>
        <p><strong>Defect, Cooperate:</strong> 0, 5</p>
        <p><strong>Defect, Defect:</strong> 1, 1</p>
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>Iteration</th>
            <th>Algorithm 1 Score</th>
            <th>Algorithm 1 Move</th>
            <th>Algorithm 2 Score</th>
            <th>Algorithm 2 Move</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.iteration}>
              <td>{result.iteration}</td>
              <td>{result.score1} (+{result.scoreChange1})</td>
              <td>{result.move1}</td>
              <td>{result.score2} (+{result.scoreChange2})</td>
              <td>{result.move2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Average Scores</h3>
      <p>Algorithm 1 ({algorithms[algorithm1].name}): {avgScoreChange1.toFixed(2)}</p>
      <p>Algorithm 2 ({algorithms[algorithm2].name}): {avgScoreChange2.toFixed(2)}</p>
      <h3>Final Scores</h3>
      {results.length > 0 && (
        <div>
          <p>Algorithm 1 ({algorithms[algorithm1].name}): {results[results.length - 1].score1}</p>
          <p>Algorithm 2 ({algorithms[algorithm2].name}): {results[results.length - 1].score2}</p>
        </div>
      )}
      <h3>Algorithm Details</h3>
      <div className="algorithm-details">
        <h4>All Algorithms</h4>
        {Object.keys(algorithms).map((key) => (
          <div key={key} className="algorithm-item">
            <h4>{algorithms[key].name}</h4>
            <p>{algorithms[key].description}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Game;
