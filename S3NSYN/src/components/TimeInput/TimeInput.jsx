import "./TimeInput.scss";
import { useEffect, useState} from "react";

function TimeInput({ className, handleTimeInput, index, defaultTime }) {
  const [time, setTime] = useState(defaultTime || { hour: "", minute: "", ampm: "am" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (defaultTime) {
      setTime(defaultTime);
    }
  }, [defaultTime]); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedTime = { ...time, [name]: value };

    if (value === "") {
      setError("");
    } else if (name === "hour" && value == 0) {
      setError("Hour value cannot be '0'");
    } else if (
      (name === "hour" && value > 0 && value <= 12) ||
      (name === "minute" && value >= 0 && value <= 59) ||
      name === "ampm"
    ) {
      setError("");
    } else {
      return;
    }
    console.log(updatedTime);
    setTime(updatedTime);
    handleTimeInput(updatedTime, index); 
  };

  return (
    <>
      <div className={`${className} time-input`}>
        <input
          className="time-input__digit"
          name="hour"
          placeholder="3"
          maxLength="2"
          value={time.hour}
          onChange={handleChange}
        ></input>
        <p className="time-input__colon">:</p>
        <input
          className="time-input__digit"
          name="minute"
          placeholder="33"
          maxLength="2"
          value={time.minute}
          onChange={handleChange}
        ></input>
        <select
          className="time-input__ampm"
          name="ampm"
          value={time.ampm}
          onChange={handleChange}
        >
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
      </div>
      <div className="time-input__error">{error && <p>{error}</p>}</div>
    </>
  );
}

export default TimeInput;
