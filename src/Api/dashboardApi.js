import axios from "axios";

const getDashboardData = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/dashboard");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getChargeHistoryData = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/chargeHistory");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getDashboardData, getChargeHistoryData };
