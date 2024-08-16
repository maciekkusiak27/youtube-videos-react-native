import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isReminderEnabled, setIsReminderEnabled] = useState(true);
  let repeatTime = "12:00";

  const toggleSwitch = () =>
    setIsReminderEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../assets/icons/leftarrow-icon.svg")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.userInfo}>
        <Image
          source={require("../assets/icons/person-icon.svg")}
          style={styles.userIcon}
        />
        <Text style={styles.userName}>John Doe</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.reminders}>
        <Image
          source={require("../assets/icons/notification-icon.svg")}
          style={styles.bellIcon}
        />
        <Text style={styles.remindersText}>Learning reminders</Text>
      </View>

      <View style={styles.repeatContainer}>
        <Text style={styles.repeatText}>Repeat everyday at:</Text>
        <View style={styles.clockView}>
          <Image
            source={require("../assets/icons/clock-icon.svg")}
            style={styles.clockIcon}
          />
          <Text>{repeatTime}</Text>
        </View>
        <Switch
          trackColor={{ false: "red", true: "orange" }}
          thumbColor={isReminderEnabled ? "pink" : "purple"}
          value={isReminderEnabled}
          onValueChange={toggleSwitch}
          style={styles.switch}
        />
      </View>

      <Text style={styles.studyReminderText}>
        You will receive friendly reminder to remember to study
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    backgroundColor: "#2D3440",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    height: 4,
    backgroundColor: "#000",
    marginVertical: 16,
    marginHorizontal: -16,
  },
  reminders: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  remindersText: {
    fontSize: 16,
  },
  repeatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  repeatText: {
    fontSize: 16,
    marginRight: 16,
    flex: 1,
  },
  clockIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  clockView: {
    flexDirection: "row",
  },
  switch: {
    marginLeft: "auto",
  },
  studyReminderText: {
    fontSize: 12,
    marginTop: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
