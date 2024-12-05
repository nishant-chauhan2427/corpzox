import React, { useState } from 'react';

function DropdownField({ index, field, className, onChange }) {
  const { options, value ,isRequiredMsg} = field;

  const [selectedValue, setSelectedValue] = useState(value || ''); // Initialize with passed value or empty
  const isRequired = true;

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(index, event.target.value); // Pass the updated value to the parent
  };

  return (
    <div className={`border rounded-md p-2 ${className}`}>
      {field.lebel && <p className="mb-1">{field.lebel}{isRequired? <span className='text-red-600'>*</span>:""}</p>}
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
      >
        <option value="" disabled>Select an option</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      {isRequiredMsg && <p className='text-xs text-red-500 mb-3 pl-3'>{field?.isRequiredMsg }</p> }
    </div>
  );
}

export default DropdownField;
