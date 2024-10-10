import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Link, useFocusEffect, router} from 'expo-router';

const EditUnit = () => {
  const [data, setData] = useState(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const selectWarlord = () => {setType("Warlord")}
  const selectBattleLine = () => {setType("BattleLine")}
  const selectCharacter = () => {setType("Character")}

  const getData = async () => {
    try {
      const key = await AsyncStorage.getItem('keySelected');
      if (!key) {
        console.error('No keySelected found');
        return; // If no key is found, exit
      }
  
      const jsonValue = await AsyncStorage.getItem(key);
      if (!jsonValue) {
        console.error(`No value found for key: ${key}`);
        return; // Exit if no value is found
      }
  
      const parsedValue = JSON.parse(jsonValue);
      if (parsedValue) {
        setData(parsedValue);
        setName(parsedValue.name);
        setUnit(parsedValue.unit);
        setType(parsedValue.type);
        // check to see if key exist
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // Key exists, so remove it
            await AsyncStorage.removeItem(key);
            }
        }
    } catch (e) {
      console.error('Error reading value:', e);
    }
  };

  const mergeInfo = async () => {
    if (type != "" && name != "" && unit != ""){
    const character = {
      name: name,
      type: type,
      unit: unit
    }
      
    try {
      const jsonValue = JSON.stringify(character)
      await AsyncStorage.setItem(name, jsonValue)
    } catch(e) {
      
    }
  } else {
    console.log('Nothing to save')
  }
    
    console.log('Done.')
    router.back();
  }

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.container, {justifyContent:"space-evenly"}]}>
      <View style={styles.card}>
        <View style={styles.cardBase}>
          <Text style={styles.header}>Edit Character</Text>
          <Text style={styles.body}>Let the galaxy burn!</Text>
        </View>
        <Text style={styles.typeText}>Type</Text>
        <View style={styles.minicardContainer}>
          <TouchableWithoutFeedback onPress={selectWarlord}>
          <View style={[styles.minicard, {backgroundColor:type === "Warlord" ? "#A5B68D" : "#FCFAEE"}]}><Text style={styles.body}>Warlord</Text></View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={selectBattleLine}>
          <View style={[styles.minicard, {backgroundColor:type === "BattleLine" ? "#A5B68D" : "#FCFAEE"}]}><Text style={styles.body}>BattleLine</Text></View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={selectCharacter}>
          <View style={[styles.minicard, {backgroundColor:type === "Character" ? "#A5B68D" : "#FCFAEE"}]}><Text style={styles.body}>Character</Text></View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.typeText}>Name</Text>
        <View style={styles.bobble}><TextInput style={styles.header} onChangeText={setName} value={name} placeholder='Termagnets'/></View>
        <Text style={styles.typeText}>Unit Count</Text>
        <View style={styles.bobble}><TextInput style={styles.header} onChangeText={setUnit} value={unit} placeholder='30' keyboardType="numeric"/></View>

        <View style={{paddingBottom: 20}}></View>
        <TouchableWithoutFeedback onPress={() => {router.back()}}><View style={[styles.Donebutton, {backgroundColor:"#C62E2E"}]}><Text style={[styles.body, {color:"#F4F6FF"}]}>Delete</Text></View></TouchableWithoutFeedback>
        <View style={{paddingBottom: 10}}></View>
        <TouchableWithoutFeedback onPress={mergeInfo}><View style={styles.Donebutton}><Text style={styles.body}>Done!</Text></View></TouchableWithoutFeedback>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

export default EditUnit;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFAEE',
  },
  
  card: {
    height: '65%',
    width: '80%',
    backgroundColor: '#FCFAEE',
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    margin: 10,
  },

  cardBase: {
    height: 85,
    width: '90%',
    backgroundColor: '#ECDFCC',
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  typeText: {
    textAlign: 'left',
    width: '100%', 
    fontSize: 24,   
    fontWeight: 'regular',
    color: '#000', 
    marginTop: 10, 
    padding: 10
  },

  minicardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',  
  },

  minicard: {
    height: 25,
    width: '30%',
    backgroundColor: '#ECDFCC', 
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  bobble: {
    height: 50,
    width: '90%',
    backgroundColor: '#ECDFCC', 
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  Donebutton: {
    height: '9%',
    width: '90%',
    backgroundColor: '#A5B68D', 
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  // Text styles
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },

  body: {
    fontSize: 12,
    color: '#666',
  },
});