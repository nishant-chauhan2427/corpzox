import React, { useState } from 'react';

function CheckBoxField({ index, field, className, onChange }) {
  const { options, value,isRequired,isRequiredMsg } = field; // `value` is an array of selected options
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
      {field.lebel && <p className="mb-1">{field.lebel} {isRequired? <span className='text-red-600'>*</span>:""} </p>}
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
      {isRequiredMsg && <p className='text-xs text-red-500 mb-3 pl-3'>{field?.isRequiredMsg }</p> }
    </div>
  );
}

export default CheckBoxField;
