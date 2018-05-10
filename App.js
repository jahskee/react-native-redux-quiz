import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Provider } from "react-redux";

import Ionicons from "react-native-vector-icons/Ionicons";
import QuizCategoryScreen from "./components/screens/QuizCategoryScreen";
import QuizPageScreen from "./components/screens/quiz-page/QuizPageScreen";
import ViewResultScreen from "./components/screens/ViewResultScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import Config, { Color } from "./components/utils/config";
import store from "./components/redux/store";

global.log = console.log;

const MainStack = createStackNavigator(
  {
    QuizCategory: QuizCategoryScreen,
    QuizPage: QuizPageScreen,
    ViewResult: ViewResultScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "QuizCategory",
    navigationOptions: {
      headerTintColor: Color.primary,
      headerStyle: {
        backgroundColor: "#fff"
      }
    }
  }
);

MainStack.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) =>
    <Ionicons
      name={`ios-home${focused ? "" : "-outline"}`}
      size={25}
      color={`${focused ? Color.primary : "red"}`}
    />
};

const MainTabs = createBottomTabNavigator(
  {
    Home: MainStack,
    Settings: SettingsScreen
  },
  {
    tabBarOptions: {
      activeTintColor: Color.primary
    }
  }
);

const AppNavigator = createSwitchNavigator({
  Main: MainTabs
});

export default class App extends React.Component {
  setMaxQuestions = maxQuestions => {
    this.setState({ maxQuestions });
  };
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

//---------- Styling ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
