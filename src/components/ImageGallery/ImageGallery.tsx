import ImageCard from "../ImageCard/ImageCard";
import style from "./ImageGallery.module.css";

interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
}

interface Props {
  images: Image[];
  onClick: (modalImage: Image) => void
}

const ImageGallery = ({ images, onClick }: Props): JSX.Element => {

  return <ul className={style.gallery}>
    	{images.map((image) => (
      	<li key={image.id} onClick={() => onClick(image)}>
        	<ImageCard image={image} />
      	</li>
    	))}
  	</ul>
}

export default ImageGallery;
