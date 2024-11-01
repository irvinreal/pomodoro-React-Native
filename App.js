import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      playSound();
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = () => {
    isActive ? stopSound() : playSound();
    setIsActive(!isActive);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("./assets/start.mp3"));
    await sound.playAsync();
  };

  const stopSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("./assets/stop.mp3"));
    await sound.playAsync();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View style={{ flex: 1, paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.Title}>Pomodoro</Text>
        <Header currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime} />
        <Timer time={time} currentTime={currentTime} />
        <View style={{ paddingHorizontal: 50 }}>
          <TouchableOpacity onPress={handleStartStop} style={styles.button}>
            <Text style={styles.buttonText}>{isActive ? "Stop" : "Start"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Title: {
    width: "30%",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 20,
    borderBottomColor: "white",
    borderBottomWidth: 4,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 5,
  },
  time: {
    fontSize: 28,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    letterSpacing: 5,
    color: "white",
    fontWeight: "bold",
  },
});
