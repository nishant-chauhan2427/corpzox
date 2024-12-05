import React, { useState } from 'react'

function RadioField({ index, field, className,onChange }) {
    const { options, value } = field;

    const [selectedValue, setSelectedValue] = useState(value?value[0]:'');    

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        // field.value[0] = event.target.value;
        onChange(index,event.target.value)
    };
    
    return (
        <div className={` border rounded-md p-2 ${className}`} >
            {field.lebel && <p>{field.lebel}</p>}
            
            {options?.map((option,idx) => (
                <label key={option} className=" flex items-center pl-4">
                    <input
                        key={idx}
                        type="radio"
                        name={field?.lebel}
                        value={option}
                        checked={selectedValue === option}
                        onChange={handleChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    )
}

export default RadioField