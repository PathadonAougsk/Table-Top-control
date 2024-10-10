import { Pressable, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Link, router } from 'expo-router';

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardBase}>
          <Text style={styles.header}>Choose your move</Text>
          <Text style={styles.body}>Suffer not the unclean to live.</Text>
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.cardslot}>
            <View style={styles.numberColumn}>
              <Text style={styles.header2}>1</Text>
              <Text style={styles.header2}>2</Text>
              <Text style={styles.header2}>3</Text>
              <Text style={styles.header2}>4</Text>
              <Text style={styles.header2}>5</Text>
            </View>
          </View>
          <View style={[styles.cardslot, { backgroundColor: "#ECDFCC" }]}>
            <TouchableWithoutFeedback onPress={() => { router.push("/loadout") }}>
            <View style={styles.holderButton}>
              <Link href="/loadout" style={styles.characterCardText}>Character</Link>
            </View>
            </TouchableWithoutFeedback>
            <View style={styles.spacing} />
            <TouchableWithoutFeedback onPress={() => { router.push("/rollPage") }}>
              <View style={[styles.holderButton, { backgroundColor: "#ECDFCC", shadowColor: "#ECDFCC" }]}>
                <Text style={styles.rollLink}>Roll!</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFAEE',
  },

  card: {
    height: '70%',
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
    alignItems: "center",
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

  cardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  cardslot: {
    height: '70%',
    width: '40%',
    backgroundColor: '#FCFAEE',
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: 10,
  },

  numberColumn: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  holderButton: {
    height: '50%',
    width: '120%',
    backgroundColor: '#A5B68D',
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  characterCardText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold'
  },

  spacing: {
    padding: 20,
  },

  rollLink: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold'
  },

  // Text styles
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
  },

  header2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  body: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
