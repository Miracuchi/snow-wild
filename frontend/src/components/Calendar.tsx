/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Calendar() {
  const [selectedDates, setSelectedDates] = useState(
    Array.from({ length: 2 }, () => null)
  );

  useEffect(() => {
    setSelectedDates((prevDates) => {
      const updatedDates = [...prevDates];
      updatedDates[0] = new Date();
      return updatedDates;
    });
  }, []);

  const handleDateChange = (date: Date, index: number) => {
    const updatedDates = [...selectedDates];
    updatedDates[index] = date;
    setSelectedDates(updatedDates);
  };

  return (
    <div className="flex justify-center">
      {selectedDates.map((selectedDate, index) => (
        <div key={index} className="datePickerContainer">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => handleDateChange(date, index)}
            dateFormat="dd/MM/yyyy"
            id={`datePicker-${index}`}
            monthsShown={2}
            placeholderText={index > 0 ? "Add return" : ""}
          />
        </div>
      ))}
      <span id="divider" />
    </div>
  );
}

export default Calendar;
