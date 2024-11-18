import { Oval } from "react-loader-spinner";
import style from "./Loader.module.css";



const Loader = (): JSX.Element => (
  <div className={style.loader}>
    <Oval color="#00BFFF" height={80} width={80} />
  </div>
);

export default Loader;
