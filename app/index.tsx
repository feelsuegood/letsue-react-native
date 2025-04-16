import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight, // add background color
  TouchableWithoutFeedback, // log users press actions
  Pressable, // has many props
} from "react-native";
import { theme } from "../colors";
export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.BtnText}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.BtnText}>Travel</Text>
        </TouchableOpacity>
      </View>
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
    color: "white",
  },
});
