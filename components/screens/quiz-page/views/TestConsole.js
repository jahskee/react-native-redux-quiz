import React from "react";
import {
  StyleSheet,
  Button,
  Dimensions,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

const TestConsole = props => {
  if (props.button === "Start") {
    return (
      <View style={styles.container1}>
        <Text style={styles.fontSize20}>Ready Player One</Text>
      </View>
    );
  } else if (props.button === "Cancel") {
    return (
      <View>
        <Text style={styles.container2}>
          {props.counter}. {props.quiz.question.question}
        </Text>
        <Text style={styles.topinfo}>
          Answer: {props.answer.toUpperCase()}
        </Text>
        <View style={styles.padding1}>
          <TouchableOpacity
            onPress={() => props.onAnswer("a")}
            onLongPress={() => props.onLongPressSubmitAnswer("a")}
          >
            <Text style={styles.choices}>
              (A) {props.quiz.question.radio[0].label}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.onAnswer("b")}
            onLongPress={() => props.onLongPressSubmitAnswer("b")}
          >
            <Text style={styles.choices}>
              (B) {props.quiz.question.radio[1].label}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.onAnswer("c")}
            onLongPress={() => props.onLongPressSubmitAnswer("c")}
          >
            <Text style={styles.choices}>
              (C) {props.quiz.question.radio[2].label}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.onAnswer("d")}
            onLongPress={() => props.onLongPressSubmitAnswer("d")}
          >
            <Text style={styles.choices}>
              (D) {props.quiz.question.radio[3].label}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (props.button === "View Result") {
    return (
      <View
        style={{
          marginTop: 100,
          paddingBottom: 20,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center"
        }}
      >
        <Text style={styles.largeText}>Result</Text>
        <Text style={styles.fontSize20}>
          {" "}Total Questions: {props.max_questions}
        </Text>
        <Text style={styles.fontSize20}>
          {" "}Total Correct: {props.quiz.totalCorrect}{" "}
        </Text>
      </View>
    );
  }
};

// -------- PropTypes --------
TestConsole.propTypes = {
  button: PropTypes.string.isRequired,
  quiz: PropTypes.object.isRequired,
  onAnswer: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  max_questions: PropTypes.number.isRequired,
  onLongPressSubmitAnswer: PropTypes.func.isRequired
};

// -------- Styling --------
var { gheight, gwidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container1: {
    paddingTop: 100,
    paddingBottom: 0,
    alignContent: "center",
    justifyContent: "center"
  },
  container2: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20,
    fontWeight: "bold"
  },
  choices: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "blue",
    color: "white",
    padding: 10
  },
  topinfo: {
    fontSize: 18,
    fontWeight: "bold"
  },
  largeText: {
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 30
  },
  fontSize20: {
    fontSize: 20
  },
  padding1: {
    paddingTop: 10,
    paddingBottom: 30
  }
});

export default TestConsole;
