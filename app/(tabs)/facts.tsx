import React, { useState, useEffect } from "react"
import { 
  View, Text, TextInput, StyleSheet, ActivityIndicator, Platform, Keyboard, TouchableWithoutFeedback, useColorScheme 
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import axios from "axios"

const API_KEY = "92650d3245msh218f14b4f2890aap17efecjsn739e9768c63d"
const API_HOST = "numbersapi.p.rapidapi.com"

const FactScreen = () => {
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")
  const [fact, setFact] = useState("")
  const [loading, setLoading] = useState(false)

  // Detect system color scheme
  const isDarkMode = useColorScheme() === "dark"

  const fetchFact = async () => {
    if (!month || !day) {
      setFact("Please select a valid month and day.")
      return
    }

    setLoading(true)
    console.log(`Fetching fact for: Month ${month}, Day ${day}`)

    try {
      const response = await axios.get(
        `https://${API_HOST}/${month}/${day}/date?json`,
        {
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": API_HOST,
          },
        }
      )
      console.log("API Response:", response.data)
      setFact(response.data.text)
    } catch (error) {
      console.error("Error fetching data:", error)
      setFact("Failed to load fact. Please try again later.")
    }

    setLoading(false)
  }

  useEffect(() => {
    if (month && day) {
      fetchFact()
    }
  }, [month, day])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={[styles.heading, isDarkMode && styles.darkText]}>📅 Get an Interesting Date Fact</Text>

        {/* Fact Display */}
        <View style={styles.resultContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "blue"} />
          ) : (
            <Text style={[styles.fact, isDarkMode && styles.darkText]}>{fact}</Text>
          )}
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          {/* Day Input */}
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Enter Day (1-31)"
            placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
            keyboardType="numeric"
            maxLength={2}
            value={day}
            onChangeText={(text) => {
              let newText = text.replace(/[^0-9]/g, "")
              let num = parseInt(newText, 10)
              if (!isNaN(num) && num >= 1 && num <= 31) {
                setDay(newText)
              } else if (newText === "") {
                setDay("")
              }
            }}
          />

          {/* Month Picker */}
          <Picker
            selectedValue={month}
            onValueChange={(itemValue) => setMonth(itemValue)}
            style={[styles.picker, isDarkMode && styles.darkPicker]}
            mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
          >
            <Picker.Item label="Select a Month" value="" />
            <Picker.Item label="January" value="1" />
            <Picker.Item label="February" value="2" />
            <Picker.Item label="March" value="3" />
            <Picker.Item label="April" value="4" />
            <Picker.Item label="May" value="5" />
            <Picker.Item label="June" value="6" />
            <Picker.Item label="July" value="7" />
            <Picker.Item label="August" value="8" />
            <Picker.Item label="September" value="9" />
            <Picker.Item label="October" value="10" />
            <Picker.Item label="November" value="11" />
            <Picker.Item label="December" value="12" />
          </Picker>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#000", // Pure black for dark mode
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  darkText: {
    color: "#fff", // White text for dark mode
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
    marginBottom: 10,
  },
  darkInput: {
    backgroundColor: "#222", // Dark gray for input box
    borderColor: "#444",
    color: "#fff",
  },
  picker: {
    width: "80%",
    height: 50,
    color: "#000",
    backgroundColor: "#fff",
  },
  darkPicker: {
    color: "#fff",
    backgroundColor: "#222", // Dark background for picker
  },
  resultContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  fact: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
})

export default FactScreen
