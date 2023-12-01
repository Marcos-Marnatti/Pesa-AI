import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Modal, Button, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import axios from 'axios';

import addIcon from "@assets/add.png";
import mealIcon from "@assets/meal.png";
import sentIcon from '@assets/sent.png';

import { ApiFood, Food, TMeals } from 'src/@types/Food';

import { styles } from './styles';
import { AuthenticatedUserContext } from '@context/AuthenticationContext';

const FoodSearchPopup = ({ isVisible, onClose, onAddFood, meal }: { isVisible: boolean, onClose: () => void, onAddFood: (userId: string, mealId: string, newFood: Food) => Promise<boolean>, meal: TMeals }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [qtdValue, setQtdValue] = useState(1);
  const { currentUser } = useContext(AuthenticatedUserContext);

  const handleSearch = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://192.168.0.18:8080/food/${searchTerm}`,
      headers: {}
    };

    axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if (response.data.length === 0) {
          return Alert.alert("Alimento não encontrado.");
        }

        setSearchResults(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddFood = (newFood: Food) => {
    onAddFood(currentUser?.uid!, meal.id!, newFood);
    setSearchTerm('');
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.screenContainer}>
        <View style={styles.header}>
          <Image source={mealIcon} style={[styles.myIcon, { width: 90, height: 90 }]} />
          <Text style={styles.searchFoodTitle}>Procurar Alimento</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginLeft: 25 }}>
            <TextInput
              placeholder="Procure aqui..."
              placeholderTextColor={'black'}
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={{ borderWidth: 0.5, borderRadius: 20, borderColor: 'black', width: '90%', padding: 15, marginTop: 10 }}
            />
            <TouchableOpacity
              activeOpacity={.7}
              onPress={handleSearch}
            >
              <View style={{ width: '150%', justifyContent: 'flex-end', right: 50, top: 5, borderLeftWidth: 1 }}>
                <Image source={sentIcon} style={{ width: 28, height: 28, alignSelf: 'center' }} />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ fontFamily: 'Exo_800ExtraBold', fontSize: 16 }}>Lembre-se: <Text style={{ fontFamily: 'Exo_400Regular' }}> 1 UN = 100g </Text> </Text>
        </View >
        <View style={styles.middleScreen}>
          <FlatList
            data={searchResults}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: ApiFood) => item.id!.toString()}
            renderItem={({ item }: { item: ApiFood }) => (
              <View style={{ flex: 1, width: 350 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                  <View style={{ gap: 5 }}>
                    <Text style={{ fontFamily: 'Exo_800ExtraBold', fontSize: 12 }}>{item.description}</Text>
                    <Text style={{ fontFamily: 'Exo_800ExtraBold', fontSize: 12 }}>Calorias: <Text style={{ fontFamily: 'Exo_400Regular' }}>{item.cal}</Text></Text>
                    <Text style={{ fontFamily: 'Exo_800ExtraBold', fontSize: 12 }}>Proteína: <Text style={{ fontFamily: 'Exo_400Regular' }}>{item.protein}</Text></Text>
                    <Text style={{ fontFamily: 'Exo_800ExtraBold', fontSize: 12 }}>Carboidrato: <Text style={{ fontFamily: 'Exo_400Regular' }}>{item.fat}</Text></Text>
                    <Text style={{ fontFamily: 'Exo_800ExtraBold', fontSize: 12 }}>Gordura: <Text style={{ fontFamily: 'Exo_400Regular' }}>{item.carbohydrate}</Text></Text>
                    <Text style={{ fontFamily: 'Exo_800ExtraBold', fontSize: 12 }}>Quantidade:</Text>
                    <NumericInput
                      value={qtdValue}
                      onChange={setQtdValue}
                      onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                      totalWidth={90}
                      totalHeight={30}
                      iconSize={20}
                      step={0.5}
                      valueType='real'
                      rounded
                      textColor='black'
                      //@ts-ignore
                      iconStyle={{ color: 'white' }}
                      rightButtonBackgroundColor='#24B3B3'
                      leftButtonBackgroundColor='#2EE6A8' />
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      const newFood: Food = {
                        name: item.description!,
                        kcal: item.cal! * qtdValue,
                        protein: item.protein! * qtdValue,
                        carbohydrate: item.fat! * qtdValue,
                        fat: item.carbohydrate! * qtdValue,
                        quantity: 1 * qtdValue,
                        quantityUnit: "un",
                      };
                      handleAddFood(newFood);
                      return (
                        Alert.alert("Alimento adicionado.")
                      )
                    }}
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <Image source={addIcon} style={[styles.myIcon, { width: 36, height: 36 }]} />
                  </TouchableOpacity>
                </View>
                <View style={{ height: 25, width: '100%', borderBottomWidth: 1, borderBottomColor: '#DFD8C8', }} />
              </View>
            )}
            ListEmptyComponent={() => (
              <View style={{ height: '2000%', justifyContent: 'center' }}>
                <Text style={[styles.textButton, { color: 'black' }]}>
                  Você ainda não procurou...
                </Text>
              </View>
            )}
          />
          <View style={{ marginBottom: 30 }}>
            <Button title="Fechar" onPress={() => {
              onClose();
              setSearchTerm('');
              setSearchResults([]);
            }} />
          </View>
        </View>
      </View>
    </Modal >
  );
};

export default FoodSearchPopup;
