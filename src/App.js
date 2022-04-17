import { msg_controller } from "./action/sms_sender.js";
import { get_weather_status, get_temperature}  from "./action/weather_getter.js"

export const App = async () => {
  
  const wheather_msg_sender = async () => {
    const weather_data = await get_weather_status();
    const temp_data = await get_temperature();
    // console.log(weather_data);
    // console.log(temp_data);
    msg_controller(temp_data,weather_data);
    return true
  }
  
  return ( (async() => await wheather_msg_sender())() );
}

(async () => console.log(await App() ) )();
