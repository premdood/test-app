/* eslint-disable react/prop-types */
export default function Scorecard({
  name,
  score,
  maxMarks,
  wrongQues,
  totalQues,
  correctQues,
  changeLocation,
  changeSelectedOptions,
}) {
  return (
    <div className='score-page'>
      <div className='score-container'>
        <h1>Quiz Result</h1>
        <div className='score-report'>
          <div className='row'>
            <span>Name</span>
            <span>{name}</span>
          </div>
          <div className='row'>
            <span>Maximum Score</span>
            <span>{maxMarks}</span>
          </div>
          <div className='row'>
            <span>Your Score</span>
            <span>{score}</span>
          </div>
          <div className='row'>
            <span>Total Questions</span>
            <span>{totalQues}</span>
          </div>
          <div className='row'>
            <span>Correct Questions</span>
            <span>{correctQues}</span>
          </div>
          <div className='row'>
            <span>Unattempted Questions</span>
            <span>{totalQues - correctQues - wrongQues}</span>
          </div>
          <div className='row'>
            <span>Wrong Questions</span>
            <span>{wrongQues}</span>
          </div>
        </div>
        <button
          className='btn start-btn'
          onClick={() => {
            changeSelectedOptions([]);
            changeLocation('quiz-game');
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
