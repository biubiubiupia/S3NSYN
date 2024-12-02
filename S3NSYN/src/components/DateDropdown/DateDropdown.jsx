import "./DateDropdown.scss";

function DateDropdown ({name}) {

  const generateOptions = () => {
    return Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      const suffix =
        day === 1 || day === 21 || day === 31
          ? "st"
          : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
          ? "rd"
          : "th";
      return (
        <option key={day} value={`${day}${suffix}`}>
          {day}
          {suffix}
        </option>
      );
    });
  };

  return <select className={`date-dropdown ${name}`}>{generateOptions()}</select>;
};

export default DateDropdown;
