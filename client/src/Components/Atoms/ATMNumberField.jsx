import React from "react";

const ATMNumberField = ({
    name,
    value,
    onChange,
    onBlur,
    label,
    placeholder,
    className = '',
    size = 'medium',
    color = 'primary',
    errorMessage = '',
    touched = false,
}) => {
    // Handle different sizes for the input
    const getSizeClass = () => {
        switch (size) {
            case 'small':
                return 'h-[28px] p-1';
            case 'large':
                return 'h-[40px] p-2';
            default:
                return 'h-[32px] p-1.5'; // medium is the default size
        }
    };

    // Handle different colors for the input
    const getColorClass = () => {
        switch (color) {
            case 'secondary':
                return 'border-gray-500 focus:border-gray-700';
            default:
                return 'border-sky-500 focus:border-sky-700'; // primary is the default color
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="font-semibold">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="number"
                onChange={onChange}
                onBlur={onBlur} // Attach onBlur event
                placeholder={placeholder}
                value={value}
                className={`border rounded ${getSizeClass()} ${getColorClass()} w-full outline-none ${className}`}
            />
            {/* Show error message if the field has been touched and there's an error */}
            {touched && errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
        </div>
    );
};

export default ATMNumberField;