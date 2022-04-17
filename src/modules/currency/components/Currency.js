import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field } from "react-final-form";

import Preloader from "./Preloader/Preloader";
import style from "./Currency.module.css";
import SelectCurrency from "./SelectCurrency/SelectCurrency";
import InputCurrency from "./InputCurrency/InputCurrency";
import { getRates } from "../store/ratesAction";

const CurrencyForm = ({ handleSubmit, form, values }) => {
    const dispatch = useDispatch();
    const rates = useSelector((state) => state.rates);
    const direction = `${values.fromCurrency}/${values.toCurrency}`;
    const currentDirectionRate = rates[direction]?.data?.rate || 0;

    useEffect(() => {
        // Делаю проверку на то есть ли данные по этой валюте, что бы не делать повторный запрос
        if (!rates[direction]?.data) {
            dispatch(getRates(values.fromCurrency, values.toCurrency));
        }
    }, [values.fromCurrency, values.toCurrency]);

    const numberPattern = (value) => {
        const numbers = /^[-,.0-9]+$/; // Паттерн на ввод чисел и точки
        const valueWithoutLastChar = value.slice(0, -1); // значение без последнего числа
        const isIncludes = valueWithoutLastChar.includes("."); // содержит ли значение точку
        const lastCharEqualDot = value[value.length - 1] === "."; // Равен ли последний элемент точке
        console.log(value, { isIncludes, lastCharEqualDot });
        if (value.match(numbers)) {
            if (lastCharEqualDot && isIncludes) {
                return valueWithoutLastChar;
            }
            return value;
        }

        return valueWithoutLastChar;
    };

    useEffect(() => {
        //Проверка на фокусирование верхнего поля, делать все аперации по изменению нижнего поля, только если верхнее онФокус
        if (!form.getFieldState("toAmount").active) {
            const toAmount = (values.fromAmount || 0) * currentDirectionRate; //действие в скобках возвращает первое true значение, если не найдет, то последнее
            form.change("toAmount", toAmount.toFixed(2));
        }
    }, [values.fromAmount, currentDirectionRate]);

    useEffect(() => {
        //Проверка на фокусирование верхнего поля, делать все аперации по изменению нижнего поля, только если верхнее онФокус
        if (form.getFieldState("toAmount").active) {
            const fromAmount = (values.toAmount || 0) / currentDirectionRate; //действие в скобках возвращает первое true значение, если не найдет, то последнее
            form.change("fromAmount", fromAmount.toFixed(2));
        }
    }, [values.toAmount, currentDirectionRate]);

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <div className={style.form_input}>
                <Field
                    name="fromAmount"
                    placeholder="From"
                    component={InputCurrency}
                    parse={numberPattern}
                />
                <div className={style.form_select}>
                    <Field name="fromCurrency" component={SelectCurrency} />
                </div>
            </div>
            <div className={style.form_input}>
                <Field
                    name="toAmount"
                    component={InputCurrency}
                    placeholder="To"
                />
                <div className={style.form_select}>
                    <Field name="toCurrency" component={SelectCurrency} />
                </div>
            </div>
        </form>
    );
};

const Currency = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.rates.isLoading);

    const onSubmit = async (values) => {
        window.alert(JSON.stringify(values, 0, 2));
    };
    return (
        <div className={style.currency}>
            <div className="container">
                <div className={style.currency_inner}>
                    {isLoading ? <Preloader /> : null}
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{
                            fromCurrency: "USD",
                            toCurrency: "UAH",
                        }}
                        render={CurrencyForm}
                    />
                </div>
            </div>
        </div>
    );
};

export default Currency;
