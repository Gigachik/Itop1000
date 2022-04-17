import style from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
    const base = useSelector((state) => state.rates.base);

    return (
        <header className={style.header}>
            <div className="container">
                <div className={style.header_inner}>
                    {base ? (
                        <div className={style.header_currency}>
                            <span>💵 {base.USD.UAH}</span>
                            <span>💶 {base.EUR.UAH}</span>
                        </div>
                    ) : (
                        <span>No Data</span>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
