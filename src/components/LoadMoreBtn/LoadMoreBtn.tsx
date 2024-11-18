import style from "./LoadMoreBtn.module.css";

interface Props {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: Props): JSX.Element => (
  <button className={style.button} onClick={onClick}>
    Load more
  </button>
);

export default LoadMoreBtn;
