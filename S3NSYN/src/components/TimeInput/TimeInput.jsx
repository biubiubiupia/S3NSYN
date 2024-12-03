import "./TimeInput.scss";
import { useState } from "react";

function TimeInput({ className, handleTimeInput }) {
  const [time, setTime] = useState({ hour: "", minute: "", ampm: "am" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sanitize value: Ensure it's numeric and remove leading zeros
    const sanitizedValue = value.replace(/^0+/, "") || "0";
    const numValue = parseInt(sanitizedValue, 10);

    // Validate range and update state only if valid
    if (
      (name === "hour" && numValue >= 1 && numValue <= 12) ||
      (name === "minute" && numValue >= 0 && numValue <= 59) ||
      name === "ampm"
    ) {
      const updatedTime = { ...time, [name]: sanitizedValue };
      setTime(updatedTime);

      // Format for request body
      const formattedHour = (updatedTime.hour || "0").padStart(2, "0");
      const formattedMinute = (updatedTime.minute || "00").padStart(2, "0");
      const formattedTime = `${formattedHour}:${formattedMinute} ${updatedTime.ampm}`;

      // Pass the formatted time to the parent handler
      handleTimeInput(formattedTime);
    }
  };

  return (
    <div className={`${className} time-input`}>
      <input
        className="time-input__digit"
        name="hour"
        placeholder="3"
        min="1"
        max="12"
        value={time.hour}
        onChange={handleChange}
      ></input>
      <p className="time-input__colon">:</p>
      <input
        className="time-input__digit"
        name="minute"
        value={time.minute}
        onChange={handleChange}
        placeholder="33"
        min="00"
        max="59"
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
  );
}

export default TimeInput;
