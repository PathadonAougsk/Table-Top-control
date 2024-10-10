import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { router, useFocusEffect } from 'expo-router';

const Loadout = () => {
  const [allData, setAllData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadAllData();
    }, [])
  );

  const loadAllData = async () => {
    try {
      await AsyncStorage.removeItem("keySelected");

      const keys = await AsyncStorage.getAllKeys();

      const filteredKeys = keys.filter(key => key !== "keySelected");

      const result = await AsyncStorage.multiGet(filteredKeys);

      const data = result.map(([key, value]) => {
        return { key, value: value ? JSON.parse(value) : null };
      });

      setAllData(data); // Update state with the new data

    } catch (e) {
      console.error('Error getting keys or values:', e);
    }
  };

  const writedata = async (keys) => {
    try {
      await AsyncStorage.setItem('keySelected', keys);
    } catch (e) {
      console.log("failed to save")
    }

    router.push("/EditUnit")
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TouchableWithoutFeedback onPress={() => router.back()}>
        <View style={[styles.cardBase, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECDFCC', height: 85, }]}>
          <Text style={styles.header}>LOADOUT</Text>
          <Text style={styles.body}>Let the galaxy burn!</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ margin: 20 }} />

      <ScrollView style={{ width: "100%", paddingLeft: 10 }}>
        {allData.length > 0 ? (
          allData.map(({ key, value }) => (
            <View key={key} style={[styles.cardBase, { flexDirection: "column" }]}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 40 }}>
                <View>
                  <Text style={[styles.header, { fontSize: 32 }]}>{value.type}</Text>
                  <Text style={[styles.name, { fontSize: 14 }]}>{value.unit}x {value.name}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => writedata(key)} style={{ marginRight: 20 }}>
                  <Image source={require('../assets/diceAssest/setting.png')} style={{ height: 50, width: 50 }} />
                </TouchableWithoutFeedback>
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text style={[styles.header, { textAlign: "center" }]}>Add Character!</Text>
            <Text style={[styles.body, { textAlign: "center" }]}>By pressing Create</Text>
          </View>
        )}
        
        <TouchableWithoutFeedback onPress={() => router.push("/CreateUnit")}>
          <View style={[styles.cardCreate, {margin:10}]}>
            <Text style={styles.header}>Create</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      <TouchableWithoutFeedback onPress={() => router.replace("/")}>
        <View style={[styles.cardBase, {alignItems: 'center', justifyContent: 'center', height: 85, backgroundColor: '#ECDFCC'}]}>
          <Text style={styles.header}>Go back</Text>
          <Text style={styles.body}>Choose Your Move</Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ margin: 20 }}></View>
    </View>
  );
};

export default Loadout;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFAEE',
  },

  cardBase: {
    height: 130,
    width: '90%',
    backgroundColor: '#FCFAEE',
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    margin: 10,
  },

  cardCreate: {
    height: 50,
    width: '90%',
    backgroundColor: '#A5B68D',
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },

  body: {
    fontSize: 10,
    color: '#666',
  },

  name: {
    fontSize: 12,
    color: '#666',
  },
});
