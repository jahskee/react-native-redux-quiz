import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const SubmitButton = props => {
  if (props.title === "Start") {
    return (
      <View>
        <TouchableOpacity onPress={props.startHandler}>
          <Text style={styles.text1}>Press Start</Text>
        </TouchableOpacity>)
        <Text>Time Pressured</Text>
      </View>
    );
  } else if (props.title === "View Result") {
    return <Button title={props.title} onPress={props.viewResultHandler} />;
  } else if (props.title === "Cancel") {
    return (
      <View style={styles.container1}>
        <Button
          title="Submit"
          onPress={props.onSubmitAnswerHandler}
          disabled={props.disableSubmit}
          raised={true}
          theme="dark"
          overrides={true}
          backgroundColor="#3fffff"
        />
        <Button title={props.title} onPress={props.cancelHandler} />
      </View>
    );
  }
  return null;
};

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  startHandler: PropTypes.func.isRequired,
  viewResultHandler: PropTypes.func.isRequired,
  onSubmitAnswerHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  disableSubmit: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: "row"
  },
  text1: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 40,
    color: "#6DC5EA"
  }
});

export default SubmitButton;
