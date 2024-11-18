import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage"; 
import { fetchImages } from "./api";
import { Toaster, toast } from "react-hot-toast";

interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
}

interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
}

const App = (): JSX.Element => {
  const [images, setImages] = useState<Image[]>([]);  
  const [query, setQuery] = useState<string>("");  
  const [page, setPage] = useState<number>(1); 
  const [loading, setLoading] = useState<boolean>(false);  
  const [modalImage, setModalImage] = useState<Image | null>(null);  
  const [hasMore, setHasMore] = useState<boolean>(false);  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: FetchImagesResponse = await fetchImages(query, page);
        setImages((prev) => [...prev, ...data.results]);
        setHasMore(page < data.total_pages);
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [query, page]); 

  const handleSearch = (newQuery: string): void => {
    if (newQuery.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }
    setQuery(newQuery);
    setImages([]);  
    setPage(1); 
    setError(null);  
  };

  const handleLoadMore = (): void => setPage((prev) => prev + 1);

  const openModal = (image: Image): void => setModalImage(image);
  const closeModal = (): void => setModalImage(null); 

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onClick={openModal} />
      {loading && <Loader />}
      {hasMore && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
