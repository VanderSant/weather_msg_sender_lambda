import dotenv from "dotenv"
dotenv.config()

import axios from 'axios';
import moment from "moment";
import suffix from "../type/action_types"

export const get_weather_status = async () => {
  const weather_raw_data = await GetWeatherData(suffix.weather_status);
  const weather_data = []
  weather_raw_data.forEach( (data) => {
    if(data > 99){
      weather_data.push(data - 100)
    } else {
      weather_data.push(data)
    }
  })
  return weather_data;
}

export const get_temperature = async () => {
  return await GetWeatherData(suffix.air_temp);
}

const GetWeatherData = async(suf) => {
  try{
    const day_begin = moment().format("YYYY-MM-DDTHH:mm:ssZ");
    const day_end = moment().add(16, 'hour').format("YYYY-MM-DDTHH:mm:ssZ");

    const day_data = await GetWeatherRawData(day_begin,day_end,suf);
    const temp_values = [];
    day_data.forEach(({data,value}) => {
      temp_values.push(value)
    })
    return temp_values

  }catch (error) {
    console.log(error);
    console.log('FAILED TO GET DATA');
  }
  
}

const GetWeatherRawData = async (initialtime, finaltime,parameter) => {
  
  const username = 'vandersonscompany_santos';
  const password = process.env.KEY;
  const local_gaiola = "-23.553352,-46.728454"
  const link = `https://api.meteomatics.com/${initialtime}--${finaltime}:PT1H/${parameter}/${local_gaiola}/json`;  

  const header = {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    },
  };
  
  try {
      let res = await axios.get(link, header);
      // console.log("link = ",link);
      return res.data.data[0].coordinates[0].dates;
    } catch (error) {
      console.log(error);
      console.log('FAILED TO GET DATA');
    }
    return null;
  };

//   "https://api.meteomatics.com/2022-04-04T00:00:00Z--2022-04-07T00:00:00Z:PT1H/t_2m:C/52.520551,13.461804/json"
// (async () => console.log(await GetWeatherRawData("2022-04-16T00:00:00Z","2022-04-16T07:00:00Z","t_2m:C")) )();
// (async () => console.log(await GetWeatherData(suffix.weather_status) ) )();
// (async () => console.log(await get_temperature() ) )();
(async () => console.log(await get_weather_status() ) )();