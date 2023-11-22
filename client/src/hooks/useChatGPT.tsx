import { useState } from 'react';
import axios from 'axios';

import { MessageModel } from '@chatscope/chat-ui-kit-react';

const API_KEY = process.env.REACT_APP_CHATGPT_API_KEY;
const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

export function useChatGPT(initialMessages: MessageModel[]) {
    const [messages, setMessages] = useState<MessageModel[]>(initialMessages);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const sendMessage = async (message: string): Promise<void> => {
        const newMessage: MessageModel = {
            message,
            direction: 'outgoing',
            sender: 'user',
            position: 'first',
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);

        const apiMessages = newMessages.map((messageObject) => {
            const role: 'assistant' | 'user' =
                messageObject.sender === 'ChatGPT' ? 'assistant' : 'user';
            return { role: role, content: messageObject.message };
        });

        const apiRequestBody = {
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, ...apiMessages],
        };

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/completions',
                apiRequestBody,
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const receivedMessage: MessageModel = {
                message: response.data.choices[0].message.content,
                sender: 'ChatGPT',
                direction: 'incoming',
                position: 'single',
            };

            setMessages([...newMessages, receivedMessage]);
            setIsTyping(false);
        } catch (error) {
            console.error('Error making the API call:', error);
            setIsTyping(false);
        }
    };

    return { messages, isTyping, sendMessage };
}
