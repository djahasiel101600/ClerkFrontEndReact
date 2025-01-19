import axios from "axios";

const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log(response.data[1]);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchData;
