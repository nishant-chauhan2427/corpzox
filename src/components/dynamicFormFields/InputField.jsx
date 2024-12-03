import React, { useEffect, useState } from 'react'
import { Input } from '../inputs';

function InputField({index,field, className,onChange}) {
    console.log({index,field});


    const [error,setEror] = useState(field.error || false);
  
    useEffect(()=>{
      if(field.isValidationRequired){
        if(field.inputSubTypeValidation === "email"){
          if(field.value[0]?.includes(field.text)){
            console.log("valid");
            field.error =false;
            setEror(false); 
          }else{
            field.error =true;
            setEror(true);
          }
        }
      }
    },[field.value[0]])
    
  return (
    <div className={className}>
        <Input label={field.lebel} onChange={(e)=>onChange(index,e.target?.value)} value={field.value[0]} className={"border"}/>
        {error?<p className='text-xs text-red-500 mb-3 pl-3'>{field.custom_validation_msg}</p>:""}
    </div>
  )
}

export default InputField