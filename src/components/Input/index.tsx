import React, {InputHTMLAttributes} from 'react';
import isEmpty from "is-empty";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function Input({label, error, className, ...props}: IProps) {
  return (
    <div>
      <label>
        {label && <p className="text-slate-700 typo-body-small mb-1">{label}</p>}
        <input className={`input ${!isEmpty(error) ? `error` : ``} ${className}`} {...props}/>
        {
          !isEmpty(error) && (
            <p className="text-red-500 typo-caption">{error}</p>
          )
        }
      </label>
    </div>
  );
}

export default Input;
