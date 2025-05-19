import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight, // add background color
  TouchableWithoutFeedback, // log users press actions
  Pressable, // has many props
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../colors";
import { useEffect, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";

const STORAGE_KEY = "@toDos";

// TODO:
// 1. remember work or travel view
// 2. make a checkbox to mark complete - completed true/false
// 3. allow a user to change text

export default function Index() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      setToDos(JSON.parse(s));
    } catch (e) {
      // saving error
    }
  };
  // TODO: add loading state
  useEffect(() => {
    loadToDos();
  }, []);
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    // can't mutate toDos object so use "Objenc.assign()"
    // This way, the key will actually be the string "Date.now()"
    // const wrongToDos = {
    //   "Date.now()": {text, work: working}
    // }
    // const NewToDos = Object.assign({}, toDos, {[Date.now()]: {text, work: working}})
    const newToDos = { ...toDos, [Date.now()]: { text: text, work: working } };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDos = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancle", style: "cancel" },
      {
        text: "I'm Sure.",
        style: "destructive",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.BtnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.BtnText, color: working ? theme.grey : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        value={text}
        placeholder={working ? "Add a to do." : "Where do you want to go?"}
        style={styles.input}
      />
      <ScrollView>
        {/* Object.keys(toDos) -> give array of keys */}
        {Object.keys(toDos).map((key) =>
          // classify travel and work
          toDos[key].work === working ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDos(key)}>
                <Fontisto name="trash" size={18} color="white" />
              </TouchableOpacity>
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  BtnText: {
    fontSize: 39,
    fontWeight: "800",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 15,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
