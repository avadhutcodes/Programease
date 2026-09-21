import axios from "axios";

export async function GetStatus(id: string) {
  const response = await axios.get(
    `http://localhost:3000/result/${id}`
  );

  return response.data;
}
