import axios from "axios";

export interface Consumer {
  _ID?: string;
  AREA_CODE: string;
  SERVICE_NO: string;
  CONSUMER_NAME: string;
  NICK_NAME: string;
  PARENT_NAME: string;
  CURRENT_USER: string;
  MOBILE_NUMBER: string;
  LOCATION: string;
}

export async function getConsumerDataByServiceNo(
  areacode: string,
  serviceno: string
): Promise<Consumer | null> {
  try {
    const response = await axios.get(
      `https://apepdclserver.onrender.com/searchserviceno/${areacode}/${serviceno}`
    );
    const data = response.data;

    let consumer: Consumer = {
      _ID: data?._ID,
      AREA_CODE: data?.AREA_CODE || "",
      SERVICE_NO: data?.SERVICE_NO || "",
      CONSUMER_NAME: data?.CONSUMER_NAME || "",
      NICK_NAME: data?.NICK_NAME || "",
      CURRENT_USER: data?.CURRENT_USER || "",
      PARENT_NAME: data?.PARENT_NAME || "",
      MOBILE_NUMBER: data?.MOBILE_NUMBER || "",
      LOCATION: data?.LOCATION || ""
    };

    return consumer;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return null;
      }
    }
    return null;
  }
}

export async function updateConsumer(areacode:string | null |undefined,serviceno:string | null | undefined,data:Consumer | null | undefined){

  const response = await axios.post(`https://apepdclserver.onrender.com/updateconsumer/${areacode}/${serviceno}`,data,{
    headers:{
      'Content-Type':'application/json'
    }
  })

  return response;

}


export async function addConsumer(areacode:string | any,data:Consumer|null|undefined){

  const response = await axios.post(`https://apepdclserver.onrender.com/addconsumer/${areacode}`,data,{
    headers:{
      "Content-Type":"application/json"
    }
  })

  return response;

}

export async function getAreaWiseData(areacode:string){
  const response =await  axios.get(`https://apepdclserver.onrender.com/searchareacode/${areacode}`);
  const data = await response.data;
  return data;

}
  



export {};
