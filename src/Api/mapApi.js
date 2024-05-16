import axios from "axios";

const uploadExcelFile = async (file) => {
  const formData = new FormData();
  formData.append("excel_file", file);
  try {
    const response = await axios.post("http://127.0.0.1:8000/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getCarDetails = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/");
    return response.data;
  } catch (error) {
    alert(error);
    return [];
  }
};

export { uploadExcelFile, getCarDetails };
