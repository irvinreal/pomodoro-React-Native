import { StyleSheet, Text, View } from "react-native";

export default function Timer({ time }) {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.time}>{formattedTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    paddingHorizontal: 50,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
  },
  time: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#A3A3A3FF",
  },
});
