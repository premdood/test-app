import { useEffect, useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Scorecard from './components/Scorecard';
import './index.css';

export default function App() {
  const [name, setName] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [markings, setMarkings] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [location, setLocation] = useState('home');

  function changeSelectedOptions(newSelectedOptions) {
    setSelectedOptions(newSelectedOptions);
  }

  function changeLocation(newLocation) {
    setLocation(newLocation);
  }

  function calculateScore() {
    let score = 0;
    const totalQues = questions.length;
    const maxMarks = totalQues * parseInt(markings.correctAnswerMarks);
    let correctQues = 0;
    let wrongQues = 0;

    questions.forEach((question, index) => {
      const selectedOption = selectedOptions[index];
      question.options.forEach(option => {
        if (option.id == selectedOption) {
          if (option.is_correct) {
            score += parseInt(markings.correctAnswerMarks);
            correctQues++;
          } else {
            score -= parseInt(markings.negativeMarks);
            wrongQues++;
          }
        }
      });
    });

    return { correctQues, maxMarks, score, totalQues, wrongQues };
  }

  useEffect(() => {
    let ignore = false;

    try {
      fetch('/api/Uw5CrX')
        .then(res => res.json())
        .then(data => {
          if (!ignore) {
            setQuestions(structuredClone(data.questions));
            setMarkings({
              correctAnswerMarks: data.correct_answer_marks,
              negativeMarks: data.negative_marks,
            });
            console.log(data);
          }
        });
    } catch (err) {
      console.log(err);
    }

    return () => {
      ignore = true;
    };
  }, []);

  if (location == 'home') {
    return (
      <Home name={name} setName={setName} changeLocation={changeLocation} />
    );
  } else if (questions && location == 'quiz-game')
    return (
      <Quiz
        questions={questions}
        changeLocation={changeLocation}
        selectedOptions={selectedOptions}
        changeSelectedOptions={changeSelectedOptions}
      />
    );
  else if (location == 'scorecard') {
    const scoreData = calculateScore();
    return (
      <Scorecard
        name={name}
        {...scoreData}
        changeLocation={changeLocation}
        changeSelectedOptions={changeSelectedOptions}
      />
    );
  } else {
    return <h2 className='loading'>Loading...</h2>;
  }
}
