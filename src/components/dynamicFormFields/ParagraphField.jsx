import React, { useState } from 'react';

function ParagraphField({ index, field, className, onChange }) {
  const { lebel, value } = field;
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(index, newValue); // Pass updated value to the parent
  };

  return (
    <div className={`border rounded-md p-2 ${className}`}>
      {lebel && <p className="mb-1">{lebel}</p>}
      <textarea
        value={inputValue}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        rows={5} // Default number of rows
        maxLength={2000}
        placeholder="Enter your text here..."
      />
    </div>
  );
}

export default ParagraphField;
