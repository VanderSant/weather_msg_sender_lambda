import dotenv from "dotenv"
dotenv.config()

import twilio from "twilio"
// import Math from "Math"
import { honey_friends } from "../type/sms_number.js"

const my_twilio_number = process.env.MY_TWILIO_NUMBER
const twilio_sid = process.env.TWILIO_SID
const twilio_token = process.env.TWILIO_TOKEN

export const msg_controller = (temp_data,weather_data) => {
    const max_temp = Math.max(...temp_data);
    const min_temp = Math.min(...temp_data);

    // console.log(max_temp, " ", min_temp," ", weather_data);
    
    let is_raining_day = false;
    weather_data.forEach((data) => {
        if((data == 5)||(data == 6)||(data == 8)||(data == 10)) {
            is_raining_day = true;
        }
    })

    // console.log("vai chover = ",is_raining_day);
    msg_prepare(min_temp,max_temp,is_raining_day);
}

const msg_prepare = (min_temp,max_temp,is_raining_day) => {
    let temp_msg = `A temperatura mínima na gaiola é ${min_temp} e a maxima é ${max_temp}.`
    if (min_temp < 17) {
        temp_msg = `${temp_msg} Leva uma BRUSINHA, em!`;
    }

    let rain_msg = ``;
    
    if(is_raining_day){
        rain_msg = `Hoje VAI CHOVER durante o dia! Pode tratar de levar um guarda chuva, flor.`;
    } else {
        rain_msg = `Hoje não vai chover, ta safe.`;
    }

    const body_msg = `${temp_msg}\n${rain_msg}\n-`;
    honey_friends.forEach( ({nome,number,joke}) =>{
        const header_msg = `-\nOlá ${nome}, ${joke}`;
        const compl_msg = `${header_msg}\n${body_msg}`;
        console.log(compl_msg);
        sms_sender(number,compl_msg);
    })
}
const sms_sender = (number, msg) => {
    try{
        // Find your account sid and auth token in your Twilio account Console.
        let client = new twilio(twilio_sid, twilio_token);
    
        // Send the text message.
        client.messages.create({
        to: number,
        from: my_twilio_number,
        body: msg
        });
        return true
    } catch (error) {
        console.log(error);
        console.log('FAILED TO SEND MSG');
        return false
      }
}

// (() => console.log(sms_sender('+5511993394129','oi gatinho') ))();
// (() => console.log(msg_prepare(18,23,false) ))();
// (() => console.log( ))();
