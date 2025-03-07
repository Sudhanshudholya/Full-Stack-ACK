import React from "react";

const ATMTextField = ({ name, value, onChange, label, placeholder, className }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}> {label} </label>

            <input
                id={name}
                name={name}
                type={"text"}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                className={`border border-gray-400 rounded h-[28px] p-1 w-full outline-sky-500 ${className || ''}`} 
            />
        </div>
    );
};

export default ATMTextField;