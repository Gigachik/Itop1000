import React from "react";

const SelectCurrency = (props) => {
    const { input, meta, ...rest } = props;

    const onSelectChange = (e) => {
        const value = e.target.value;
        input.onChange(value);
    };
    return (
        <select {...input} {...rest} onChange={onSelectChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
        </select>
    );
};

export default SelectCurrency;
