import { View, Text } from 'react-native'
import React from 'react';
import {useRoute} from '@react-navigation/native'
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat'
import { useState } from 'react';
import { useCallback } from 'react';
import GlobalApi from "../Services/GlobalApi"


export default function ChatScreen() {
    const param = useRoute().params;

    const [messages, setMessages] = useState([])
    const [bot, setBot] = useState([]);
    const [loading, setLoading] = useState(false)

  useEffect(() => {
    setBot(param.bot);
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am '+param.bot?.name+", How can I help you",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: param.bot?.image,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    setLoading(true);
    if(messages[0].text){
        getBardResponse(messages[0].text)
    }
  }, [])

  const getBardResponse =(msg)=>{
    GlobalApi.getBardApi(msg)
        .then(resp=>{
            if(resp.data.resp[1].content){
                const chatApiResponse = {
                    _id: Math.random()*(9999999-1),
                    text: resp.data.resp[1].content,
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: param.bot?.image,
                    },
                  }
                  setMessages(previousMessages=> GiftedChat.append(previousMessages, chatApiResponse))
                  setLoading(false)
            } else {
                setLoading(false);
                const chatApiResponse = {
                    _id: Math.random()*(9999999-1),
                    text: "Sorry, I can't help with it",
                    createdAt: new Date(),
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: param.bot?.image,
                    },
                  }
                  setMessages(previousMessages=> GiftedChat.append(previousMessages, chatApiResponse))
            }
        })
  }

  return (
    <SafeAreaView style={{
        flex: 1
    }}>
        <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={messages => onSend(messages)}
        user={{
        _id: 1,
      }}
    />
    </SafeAreaView>
  )
}