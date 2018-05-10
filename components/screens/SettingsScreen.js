/*jshint esversion: 6 */
import React from "react";
import {
  Button,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { updateSettings, updateState } from "../redux/actions";

import Config, { Color } from "../utils/config";

class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Settings",
    tabBarIcon: ({ focused, tintColor }) =>
      <Ionicons
        name={`ios-options${focused ? "" : "-outline"}`}
        size={25}
        color={Color.primary}
      />
  };

  componentDidMount() {
    const interval = this.props.state.interval;
    const interval2 = this.props.state.interval2;
    if (interval) clearInterval(interval);
    if (interval2) clearInterval(interval2);

    // need to track interval state accross tabs
    this.props.updateState({
      interval: null,
      interval2: null,
      button: "Start"
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.text1}>Max Questions</Text>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "gray",
            width: 50,
            textAlign: "center",
            padding: 5,
            fontSize: 18,
            marginBottom: 100
          }}
          onChangeText={value => {
            if (value < 1 || !value) {
              value = 1;
            }
            if (value > 10) {
              value = 10;
            }
            this.props.updateSettings({ max_questions: parseInt(value) });
          }}
          value={"" + this.props.settings.max_questions}
          keyboardType="numeric"
          selectTextOnFocus={false}
          maxLength={2}
        />

        <Button
          style={{ marginTop: 60 }}
          title="Done"
          onPress={() => {
            this.props.navigation.navigate("QuizCategory");
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

// ------- PropTypes ---------
SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

// ------- Styling ---------
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center"
  },
  text1: {
    textAlign: "center",
    color: Color.primary,
    paddingBottom: 5,
  }
});

// -------- Setup Redux --------
const mapStateToProps = state => ({
  settings: state.settings,
  state: state.state,
});
export default connect(mapStateToProps, {
  updateSettings,
  updateState,
})(SettingsScreen);
