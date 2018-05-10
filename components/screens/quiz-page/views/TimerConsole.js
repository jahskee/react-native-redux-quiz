import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

const TimerConsole = props => {
  if (props.button === "Cancel") {
    return (
      <View style={styles.container1}>
        <Text style={styles.text1}>
          {props.category.name} {props.counter} of {props.max_questions}
        </Text>
        <TimerClock timer={props.timer} />
      </View>
    );
  }
  return null;
};

const TimerClock = props => {
  const cond1 = props.timer.sec <= 5;
  const cond2 = props.timer.sec !== 0;

  const color = cond1 && cond2 ? "red" : "black";
  return (
    <View style={styles.container2}>
      <Text style={styles.text2}>Timer:</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: color }}>
        {props.timer.min.zeroPad()}:{props.timer.sec.zeroPad()}
      </Text>
    </View>
  );
};

// -------- PropTypes --------
TimerConsole.propTypes = {
  button: PropTypes.string.isRequired,
  timer: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired,
  max_questions: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired
};

TimerClock.propTypes = {
  timer: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container2: {
    flexDirection: "row"
  },
  text1: {
    marginRight: 100
  },
  text2: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default TimerConsole;
