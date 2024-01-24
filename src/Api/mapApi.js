import axios from "axios";

async function uploadExcelFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const data = await axios.post("http://127.0.0.1:8000/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
