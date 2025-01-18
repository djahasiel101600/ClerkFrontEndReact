import axios from "axios";

function Api() {
  const api = axios
    .get("http://127.0.0.1:8000/api/asdi-lfps-disbursment-voucher-record/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}

export default Api;
