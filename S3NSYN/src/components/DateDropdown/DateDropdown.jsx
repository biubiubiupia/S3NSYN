import "./DateDropdown.scss";

function DateDropdown({ name, onChange, selectedDates }) {
  const generateOptions = () => {
    return Array.from({ length: 31 }, (_, i) => {
      const date = i + 1;
      const suffix =
        date === 1 || date === 21 || date === 31
          ? "st"
          : date === 2 || date === 22
          ? "nd"
          : date === 3 || date === 23
          ? "rd"
          : "th";

      if (
        selectedDates.includes(date) &&
        selectedDates[currentIndex] !== date
      ) {
        return null;
      }
      
      return (
        <option key={date} value={date}>
          {date}
          {suffix}
        </option>
      );
    });
  };

  return (
    <select
      className={`date-dropdown ${name}`}
      onChange={(e) => onChange(Number(e.target.value))} // Pass the selected value as a number
    >
      <option value="" disabled selected>
        DATE
      </option>
      {generateOptions()}
    </select>
  );
}

export default DateDropdown;
