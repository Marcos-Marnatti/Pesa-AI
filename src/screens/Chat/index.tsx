import { useState } from "react";
import { View, Image, Text, TextInput, ImageSourcePropType, FlatList, Pressable, TouchableOpacity, Alert } from "react-native";

import pesaAI from '@assets/pesaAIpng.png';
import verified from '@assets/verified.png';
import KeyboardShift from "@components/KeyboardAvoidView";
import sentIcon from '@assets/sent.png';

import { ChatItemProp } from "src/@types/Chat";
import { api } from "@lib/axios";

import { styles } from './styles';


const ImageContainer = ({ image }: { image: ImageSourcePropType; }) => {
  return (
    <View style={styles.avatarContainer}>
      <Image source={image} style={styles.avatar} />
    </View>
  )
};

const HeaderTitle = () => {
  return (
    <View style={styles.title}>
      <Text style={styles.greetingText}>Assitente Virtual Pesa AI
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={verified} style={{ width: 16, height: 16, top: 1.5, marginRight: 2 }} />
        <Text style={styles.dateText}>Online</Text>
      </View>
    </View>
  )
};

export function ChatIA() {
  const [chats, setChats] = useState<ChatItemProp[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0.4);

  async function handleAIQuestion() {
    try {
      const currentTime = new Date().toLocaleString('pt-BR', { hour: 'numeric', minute: 'numeric' })
      const data = {
        question,
        temperature,
      }
      setQuestion('');

      if (question.length === 0) {
        return Alert.alert('Campo vazio', 'Por favor, insira uma perguntar para enviar.')
      }

      const newQuestion: ChatItemProp = {
        text: data.question,
        iAmSender: true,
        time: currentTime,
        index: new Date().getMilliseconds(),
      }

      setChats((prevState) => [...prevState, newQuestion]);

      const response = await api.post('/ai-question/complete', data);
      console.log(response.data);
      setAnswer(response.data)

      const newAnswer: ChatItemProp = {
        text: response.data,
        iAmSender: false,
        time: currentTime,
        index: new Date().getMilliseconds(),
      }

      setChats((prevState) => [...prevState, newAnswer]);
      console.log(newAnswer);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <ImageContainer image={pesaAI} />
        <HeaderTitle />
      </View >
      <KeyboardShift>
        <View style={styles.middleScreen}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chats}
            renderItem={({ item, index }) => (
              <Pressable style={{ alignItems: item.iAmSender ? 'flex-end' : 'flex-start' }}>
                <View style={{ flexDirection: "row", maxWidth: '85%', maxHeight: '100%', paddingVertical: 10, paddingHorizontal: 20, marginTop: 5, marginBottom: 12, borderRadius: 10, backgroundColor: item.iAmSender ? '#2EE6A8' : '#24B3B3' }}>
                  <Text style={{
                    alignSelf: item.iAmSender ? 'flex-end' : 'flex-start',
                    lineHeight: 22,
                    fontSize: 15,
                    fontWeight: '400',
                  }}>{item.text}</Text>
                </View>
                <Text style={{
                  alignSelf: item.iAmSender ? 'flex-end' : 'flex-start',
                  fontSize: 12,
                  top: -5,
                  color: '#8A91A8',
                  fontWeight: '400'
                }}>{item.time}</Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => `${index} + ${Date.now()}`}
            ListEmptyComponent={() => (
              <View style={{ height: 600, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#808080' }}>Você ainda não tem nenhuma conversa registrada</Text>
                <Text style={{ fontSize: 14, color: '#808080' }}>Pergunte algo e tire suas dúvidas</Text>
              </View>
            )}
          />
          <View style={{ height: 64, width: '90%', borderWidth: 1, borderRadius: 164, padding: 14, flexDirection: 'row', justifyContent: 'space-between', bottom: 30, backgroundColor: 'white' }}>
            <TextInput
              style={{
                height: 33,
                borderRightWidth: 1,
                borderRightColor: 'black',
                fontSize: 14,
                fontWeight: '400',
                width: '80%',
                marginRight: 14,
                marginLeft: 12,
              }}
              placeholder="Digite aqui..."
              value={question}
              onChangeText={setQuestion}
            />
            <TouchableOpacity onPress={handleAIQuestion}>
              <Image source={sentIcon} style={{ width: 35, height: 35, alignSelf: 'center', right: 5, }} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardShift>
    </View>
  );
}