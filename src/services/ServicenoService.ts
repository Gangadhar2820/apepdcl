import axios from "axios";

export interface Consumer {
  _ID: string;
  AREA_CODE: string;
  SERVICE_NO: string;
  CONSUMER_NAME: string;
  NICK_NAME: string;
  PARENT_NAME: string;
  CURRENT_USER: string;
  PHONE_NO: string;
  LOCATION: string;
}

export async function getConsumerDataByServiceNo(
  areacode: string,
  serviceno: string
):Promise<Consumer | null> {
  const response = await axios.get(
    `https://apepdclserver.onrender.com/searchserviceno/${areacode}/${serviceno}`
  );
  const data = await response.data;

  let _ID = data?._id;
  let AREA_CODE = data?.AREA_CODE || "";
  let SERVICE_NO = data?.SERVICE_NO || "";
  let CONSUMER_NAME = data?.CONSUMER_NAME || "";
  let NICK_NAME = data?.NICK_NAME || "";
  let CURRENT_USER = data?.CURRENT_USER || "";
  let PARENT_NAME = data?.PARENT_NAME || "";
  let PHONE_NO = data?.MOBILE_NUMBER || "";
  let LOCATION = data?.LOCATION || "";

  let consumer: Consumer = {
    _ID: _ID,
    AREA_CODE: AREA_CODE,
    SERVICE_NO: SERVICE_NO,
    CONSUMER_NAME:CONSUMER_NAME,
    NICK_NAME:NICK_NAME,
    CURRENT_USER:CURRENT_USER,
    PARENT_NAME:PARENT_NAME,
    PHONE_NO:PHONE_NO,
    LOCATION:LOCATION
  };
  return consumer;
}

export async function updateConsumer(areacode:string | null |undefined,serviceno:string | null | undefined,data:Consumer | null | undefined){

  const response = await axios.post(`https://apepdclserver.onrender.com/updateconsumer/${areacode}/${serviceno}`,data,{
    headers:{
      'Content-Type':'application/json'
    }
  })

  return response;

}

export {};
