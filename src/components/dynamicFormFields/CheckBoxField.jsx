import React, { useState } from 'react';

function CheckBoxField({ index, field, className, onChange }) {
  const { options, value } = field; // `value` is an array of selected options
  const [selectedValues, setSelectedValues] = useState(value || []);

  const handleChange = (event) => {
    const { value: optionValue, checked } = event.target;
    let updatedValues;

    if (checked) {
      updatedValues = [...selectedValues, optionValue]; // Add to the selected options
    } else {
      updatedValues = selectedValues.filter((val) => val !== optionValue); // Remove from the selected options
    }

    setSelectedValues(updatedValues);
    onChange(index, updatedValues); // Pass updated array to the parent
  };

  return (
    <div className={`border rounded-md p-2 ${className}`}>
      {field.lebel && <p className="mb-1">{field.lebel}</p>}
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center space-x-2 mb-1">
          <input
            type="checkbox"
            value={option}
            checked={selectedValues.includes(option)}
            onChange={handleChange}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

export default CheckBoxField;
