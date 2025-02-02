/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';

export default function Quiz({
  questions,
  changeLocation,
  selectedOptions,
  changeSelectedOptions,
}) {
  const [index, setIndex] = useState(0);
  const question = questions[index];

  function handleSubmit(e) {
    e.preventDefault();
    // if user did not select an option
    if (!selectedOptions[index]) {
      selectedOptions[index] = null;
    }
    setIndex(index + 1);
  }

  useEffect(() => {
    if (index > 9) {
      changeLocation('scorecard');
    }
  });

  return (
    <div className='quiz-page'>
      <div className='quiz-container'>
        {index <= 9 && (
          <>
            <div className='quiz-header'>
              <div className='ques-num'>
                {index + 1} / {questions.length}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='timer-ques-container'>
                <Timer key={question.id} setIndex={setIndex} />
                <div className='ques'>{question.description}</div>
              </div>
              <div className='options'>
                {question.options.map(option => {
                  return (
                    <Option
                      index={index}
                      key={option.id}
                      optionId={option.id}
                      questionId={question.id}
                      selectedOptions={selectedOptions}
                      selectedValue={selectedOptions[index]}
                      optionDescription={option.description}
                      changeSelectedOptions={changeSelectedOptions}
                    />
                  );
                })}
              </div>
              <button className='btn next-btn' type='submit'>
                Next
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Timer({ setIndex }) {
  const [timerCount, setTimerCount] = useState(30);
  const intervalId = useRef(null);

  useEffect(() => {
    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        setTimerCount(prev => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timerCount == 0) {
      setIndex(prev => prev + 1);
    }
  }, [timerCount, setIndex]);

  return <div className='timer'>{timerCount}</div>;
}

function Option({
  index,
  optionId = '',
  questionId,
  selectedValue,
  selectedOptions,
  optionDescription,
  changeSelectedOptions,
}) {
  function handleInputClick(e) {
    let newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = e.target.value;
    changeSelectedOptions(newSelectedOptions);
  }

  return (
    <label htmlFor={optionId}>
      <input
        type='radio'
        id={optionId}
        value={optionId}
        name={questionId}
        onClick={handleInputClick}
        checked={selectedValue && selectedValue == optionId}
      />
      {optionDescription}
    </label>
  );
}
