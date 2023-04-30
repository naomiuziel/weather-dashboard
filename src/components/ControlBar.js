import { useState } from "react";

const ControlBar = ({ addCity, cityExists }) => {
  const [input, setInput] = useState('');

  const onChangeInput = (event) => {
    setInput(event.target.value);
  }

  const onClickAdd = () => {
    if (input === '') {
      return;
    }

    if (cityExists(input)) {
      alert('This city already exists');
      return;
    }

    addCity(input);
    setInput('');
  }

  const onKeyUp = (event) => {
    if (event.key === 'Enter') {
      onClickAdd();
    }
  }

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter your location"
          onChange={onChangeInput}
          onKeyUp={onKeyUp}
          value={input}
        />
 
        <button className="btn btn-primary" type="button" onClick={onClickAdd}>
          Add location
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
