import React, { useState } from 'react';

function ParagraphField({ index, field, className, onChange }) {
  const { lebel, value,isRequired } = field;
  const [inputValue, setInputValue] = useState(value[0] || '');

//   console.log("ParagraphField",field);
  

  const handleChange = (event) => {
    const newValue = event.target.value;
    // setInputValue(newValue);
    const isError = validateField(newValue);
    onChange(index, newValue,isError); // Pass updated value to the parent
  };

  
  const validateField =(newVal) => {
    if (field.isValidationRequired) {

      if (field.inputSubType === "length") {
        return paragraphFieldValidation(newVal);
      }
    }
  }

  const paragraphFieldValidation = (newVal) => {  
    switch (field.inputSubTypeValidation) {
      case "min_char_count":
        return !(field.number && newVal?.length >= field.number);
  
      case "max_char_count":
        return !(field.number && newVal?.length <= field.number);
  
      default:
        return true; // Optional: handle unexpected values
    }
  };

  return (
    <div className={`border rounded-md p-2 ${className}`}>
      {lebel && <p className="mb-1">{lebel}{isRequired? <span className='text-red-600'>*</span>:""}</p>}
      <textarea
        value={field.value[0]}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        rows={5} // Default number of rows
        maxLength={2000}
        placeholder="Enter your text here..."
      />
        {field.error ? <p className='text-xs text-red-500 mb-3 pl-3'>{field.custom_validation_msg}</p> : ""}
    </div>
  );
}

export default ParagraphField;
