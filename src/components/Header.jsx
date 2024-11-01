import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];

export default function Header({ currentTime, setCurrentTime, setTime }) {
  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  };

  return (
    <View style={styles.optionsContainer}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[styles.item, currentTime !== index && { borderColor: "transparent" }]}
        >
          <Text style={{ fontWeight: "bold" }}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "row",
  },
  item: {
    width: "33.33%",
    alignItems: "center",
    borderWidth: 3,
    padding: 5,
    borderRadius: 7,
    borderColor: "white",
    marginVertical: 20,
  },
});
