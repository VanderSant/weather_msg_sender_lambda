import dotenv from "dotenv"
dotenv.config()

import twilio from "twilio"

const my_number = '+5511993394129';

const my_twilio_number = process.env.MY_TWILIO_NUMBER
const twilio_sid = process.env.TWILIO_SID
const twilio_token = process.env.TWILIO_TOKEN


export const msg_prepare = () => {
    mensage_header = `Olá ${nome}, ${piadoca}`;
    
}
export const sms_sender = (number, msg) => {
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

(() => console.log(sms_sender(my_number,'oi gatinho') ))();
