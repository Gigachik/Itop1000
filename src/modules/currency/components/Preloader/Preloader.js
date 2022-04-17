import style from "./Preloader.module.css";
const Preloader = () => {
    return (
        <div className={style.preloader}>
            <div className={style.preloader_inner}></div>
        </div>
    );
};
export default Preloader;
