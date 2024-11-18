import style from "./ImageCard.module.css";

interface Image {
  urls: {
    small: string;
  };
  alt_description: string;
}

interface Props {
  image: Image;  
}

const ImageCard = ({ image }: Props): JSX.Element => (

 <div className={style.card}>
    <img
      className={style.image}
      src={image.urls.small}
      alt={image.alt_description}
    />
  </div>
);

export default ImageCard;
