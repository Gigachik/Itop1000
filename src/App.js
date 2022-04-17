import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Currency from "./modules/currency/components/Currency";
import { getBase } from "./modules/currency/store/ratesAction";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBase());
    }, []);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Currency />} />
            </Routes>
        </div>
    );
};

export default App;
