/* eslint-disable react/prop-types */
export default function Home({ name, setName, changeLocation }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      // return alert('Please enter name');
    }
    changeLocation('quiz-game');
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <div className='home-container'>
      <div className='logo-form-container'>
        <div className='quiz-logo'>
          <span>Quiz</span>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor='name'>Enter your name</label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Full name'
              onChange={handleChange}
            />
          </fieldset>
          <button className='btn start-btn' type='submit'>
            Start
          </button>
        </form>
      </div>
    </div>
  );
}
