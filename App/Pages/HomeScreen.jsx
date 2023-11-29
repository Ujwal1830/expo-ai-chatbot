import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import ChatFaceData from '../Services/ChatFaceData';
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../Shared/Colors';
import {useNavigation} from '@react-navigation/native'

export default function HomeScreen() {

    const navigator = useNavigation(); 

    const [chatFaceData, setChatFaceData] = useState([]);
    const [selectedChatFace, setSelectedchatFace] = useState([]);

    useEffect(() => {
        setChatFaceData(ChatFaceData);
        setSelectedchatFace(ChatFaceData[0]);
    }, [])

    const onChatFaceClicked = (id) => {
        setSelectedchatFace(ChatFaceData[id - 1])
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 100 }}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={[{ color: selectedChatFace.primary },
                    { fontSize: 25 }]}>Hello</Text>
                    <Text style={[{ color: selectedChatFace.primary },
                    { fontSize: 25, fontWeight: 'bold' }]}>I am {selectedChatFace.name}</Text>
                </View>
                <Image style={{ width: 120, height: 120 }}
                    source={{ uri: selectedChatFace.image }}
                />
                <Text style={{ fontSize: 15 }}>How can I help you ?</Text>
            </View>

            <View style={{ alignItems: 'center', gap: 20 }}>
                <View style={{ alignItems: 'center', gap: 5 }}>
                    <View style={{
                        backgroundColor: Colors.LIGHT_GRAY, width: '100%', height: 80,
                        borderRadius: 30, alignItems: 'center'
                    }}>
                        <FlatList
                            horizontal={true}
                            data={chatFaceData}
                            renderItem={({ item, index }) => selectedChatFace.id != item.id && (
                                <TouchableOpacity
                                    onPress={() => onChatFaceClicked(item.id)}
                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <View style={{ backgroundColor: Colors.WHITE, borderRadius: 25 }}>
                                        <Image style={{ width: 45, height: 45, margin: 10, }}
                                            source={{ uri: item.image }} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <Text style={{ color: Colors.LIGHT_GRAY, fontSize: 12, }}>Choose your fav chatbuddy</Text>
                </View>
                <TouchableOpacity
                    onPress={()=> {navigator.navigate('chat', {bot: selectedChatFace})}}
                    style={{
                        backgroundColor: Colors.YELLOW, alignItems: 'center',
                        width: Dimensions.get('screen').width * 0.6, padding: 15, borderRadius: 99
                    }}>
                    <Text style={{ color: Colors.WHITE }}>Let's Chat</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}