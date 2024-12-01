import "./TimeInput.scss";

function TimeInput() {
  return (
    <div className="time-input">
      <input
        className="time-input__digit"
        type="number"
        placeholder="3"
        min="1"
        max="12"
      ></input>
      <p className="time-input__colon">:</p>
      <input
        className="time-input__digit"
        type="number"
        placeholder="33"
        min="00"
        max="59"
      ></input>
      <select className="time-input__ampm">
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
    </div>
  );
}

export default TimeInput;
