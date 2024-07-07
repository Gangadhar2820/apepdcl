import axios from "axios";

export async function addLogData(data: any) {
  const response = await axios.post(
    "https://apepdclserver.onrender.com/addlogdata",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

export async function getLogData(){
    const response = await axios.get("https://apepdclserver.onrender.com/getlogdata");
    const data = await response.data;
    return data;
}

export async function deleteLogData(id:any){
  const response = await axios.delete("https://apepdclserver.onrender.com/deletelogdata",{
    params:{
      "id":id
    }
  })
  return response
}

export {};
