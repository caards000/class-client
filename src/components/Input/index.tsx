import React, {InputHTMLAttributes, useState} from 'react';
import isEmpty from "is-empty";
import {RiEyeFill, RiEyeOffFill} from "react-icons/ri";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function Input({label, error, className, disabled, type:inputType, ...props}: IProps) {

    const[type, setType]=useState(inputType);

    const togglePassword =()=>{
        setType(prev => prev === "password"? "text": "password")
    }

  return (
    <div>
      <label>
        {label && <p className="text-slate-700 typo-body-small mb-1">{label}</p>} 
          <div className="relative flex">
            <input
              className={`input ${!isEmpty(error) ? `error` : ``} ${disabled ? "disabled" : ""} ${className} ${inputType === "password"? "pr-10" : ""}`}
              disabled={disabled}
              type={type}
              {...props}
            />
              {
                  inputType === "password" && (
                      <div
                          // type="button"
                          className ="absolute px-3 right-0 place-self-center"
                          onClick={togglePassword}
                      >
                          {type === "password"?(
                              <RiEyeOffFill className="text-gray-400"/>
                          ):(
                              <RiEyeFill className="text-gray-400"/>
                          )}
                      </div>
                  )
              }
          </div>
          {!isEmpty(error) && (
              <p className="text-red-500 typo-caption">{error}</p>
          )}

      </label>
    </div>
  );
}

export default Input;
