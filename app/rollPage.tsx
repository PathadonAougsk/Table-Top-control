import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, Image, ScrollView, Pressable, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function rollPage() {
  const [totalDice, setTotalDice] = useState('1'); // Default to 1 dice
  const [diceResults, setDiceResults] = useState([]); // Array to store dice roll results
  const [counts, setCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  const diceImages = {
    1: require('../assets/diceAssest/1.png'),
    2: require('../assets/diceAssest/2.png'),
    3: require('../assets/diceAssest/3.png'),
    4: require('../assets/diceAssest/4.png'),
    5: require('../assets/diceAssest/5.png'),
    6: require('../assets/diceAssest/6.png'),
  };

  const gohome = () => {
    router.back();
  }

  const rollDice = () => {
    const dice = [];
    for (let i = 0; i < parseInt(totalDice); i++) {
      dice[i] = Math.floor(Math.random() * 6) + 1;
    }
    setDiceResults(dice); // Store the results

    const newCounts = {
      1: dice.filter(d => d === 1).length,
      2: dice.filter(d => d === 2).length,
      3: dice.filter(d => d === 3).length,
      4: dice.filter(d => d === 4).length,
      5: dice.filter(d => d === 5).length,
      6: dice.filter(d => d === 6).length,
    };

    setCounts(newCounts);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={[styles.cardBase, {backgroundColor:"#FCFAEE", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
        <View style={{marginRight: 110}}>
        <Text style={styles.header}>Roll the Dice!</Text>
        <Text style={styles.body}>may the emperror protect</Text>
        </View>
        <View style={{width: 71, height:85, backgroundColor:"#A5B68D", borderRadius:15, justifyContent:"center", alignItems:"center"}}>
        <TextInput
          style={styles.textBox}
          value={totalDice}
          onChangeText={setTotalDice}
          keyboardType="number-pad"
          placeholder="Number of Dice"
          maxLength={2}
        />
        </View>
      </View>

      <View style={[styles.cardNum, {backgroundColor:"#ECDFCC", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}]}>
        <Text style={styles.a6text}>1:{counts[1]}</Text>
        <Text style={styles.a6text}>2:{counts[2]}</Text>
        <Text style={styles.a6text}>3:{counts[3]}</Text>
        <Text style={styles.a6text}>4:{counts[4]}</Text>
        <Text style={styles.a6text}>5:{counts[5]}</Text>
        <Text style={styles.a6text}>6:{counts[6]}</Text>
      </View>

      <View style={styles.centered}>
        <View style={styles.diceContainer}>
          {diceResults.map((result, index) => (
            <Image key={index} style={styles.diceImage} source={diceImages[result]} />
          ))}
        </View>
        
        <Pressable onPress={rollDice}>
          <View style={[styles.buttonPut, {height: 32, backgroundColor:"#A5B68D", flexDirection: "column", alignItems: "center"}]}>
            <Text style={styles.body}>Roll!</Text>
          </View>
        </Pressable>

        <TouchableWithoutFeedback onPress={gohome}>
        <View style={[styles.buttonPut, {backgroundColor:"#ECDFCC", flexDirection: "column", alignItems: "center"}]}>
            <Text style={[styles.header, {margin:-5}]}>Back</Text>
            <Text style={styles.body}>This may end well</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // General layout and container styles
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCFAEE",
  },

  centered: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  // Text styles
  textBase: {
    paddingLeft: 25,
    color: "#333", // Default dark text color for contrast
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", 
  },

  body: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic", // Adds a unique touch for body text
  },

  a6text: {
    fontSize: 24,
    fontWeight: "medium",
    color: "#333"
  },

  // Card styles
  cardBase: {
    height: 85,
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },

  // Specific card with flexible design
  card: {
    height: 85,
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    justifyContent: "center",
    margin: 10,
  },

  buttonPut: {
    height: 85,
    width: 346,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    justifyContent: "center",
    margin: 10,
  },

  cardNum: {
    height: 43,
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    justifyContent: "center",
    margin: 10,
  },

  // Dice container styles
  diceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },

  // Dice image style
  diceImage: {
    height: 100,
    width: 100,
    margin: 10,
    resizeMode: "contain",
  },

  // Input box for number of dice
  textBox: {
    textAlign: "center",
    fontSize: 32,
    borderWidth: 1,
    borderColor: "#A5B68D",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },

  // Custom box for number display
  numberShowContainer: {
    width: 71,
    height: 85,
    backgroundColor: "#A5B68D",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  numberShow: {
    fontSize: 48,
    color: "#FFF",
  },
});
