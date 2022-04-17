import React from "react";

const InputCurrency = (props) => {
    const { input, meta, ...rest } = props;

    const onInputChange = (e) => {
        const value = e.target.value;
        input.onChange(value);
    };

    return (
        <input type="number" {...input} {...rest} onChange={onInputChange} />
    );
};

export default InputCurrency;
