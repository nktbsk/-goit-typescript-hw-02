import axios from "axios";

interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string,
  };
}

interface FetchImagesResponse {
  results: Image[];  
  total_pages: number;
}

const ACCESS_KEY = "tiMMCYYTmgvcAIKgv6TxUXtwKw0rm05ydEpPZ846qow";

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${ACCESS_KEY}`,
  },
});

export const fetchImages = async (query: string, page: number = 1): Promise<FetchImagesResponse> => {
  const response = await instance.get("/search/photos", {
    params: {
      query,
      page,
      per_page: 12,
    },
  });
  return response.data;
};
