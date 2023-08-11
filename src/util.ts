import axios from 'axios';
import {Message} from './store/slices/chat.slice';

const apiKey = "key cua bạn"
const sendRequestUrl = "https://discord.com/api/v9/channels/1104260605856186368/messages"
const getRequestUrl = "https://discord.com/api/v9/channels/1104260605856186368/messages?limit=10"

async function sendMessage(message: string):Promise<boolean> {
    let payload = {
        content: message
    }

    let options = {
        headers: {
          'Authorization': `${apiKey}` 
        }
    }

    return await axios.post(sendRequestUrl,payload,options)
    .then(res => true)
    .catch(err => false)
}

async function getMessage():Promise<Message[]> {
    let messages: Message[] = [];
    let options = {
        headers: {
          'Authorization': `${apiKey}` 
        }
    }

    await axios.get(getRequestUrl,options)
    .then(res => {
        for (let i in res.data) {
            messages.push(res.data[i] as Message);
        }
    })
    .catch(err => {
        console.log("res", err)
    })

    return messages
}

export default {
    sendMessage,
    getMessage
}
