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
import { myStyle } from "./components/_styles/mystyle";

global.log = console.log;

const HomeTab = createStackNavigator(
  {
    QuizCategory: QuizCategoryScreen,
    QuizPage: QuizPageScreen,
    ViewResult: ViewResultScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "QuizCategory",
    navigationOptions: {
      headerTintColor: myStyle.primaryColor,
      headerStyle: {
        backgroundColor: myStyle.topBarColor,       
      }
    },    
  }
);

const SettingTab = createStackNavigator(
  {  
    SettingsScreen,
  },
  {
    initialRouteName: "SettingScreen",
    navigationOptions: {
      headerTintColor: myStyle.primaryColor,
      headerStyle: {
        backgroundColor: myStyle.topBarColor,       
      }
    },    
  }
);

// ------------------

const MainTabs = createBottomTabNavigator(
  {    
    Home: HomeTab,
    Settings: SettingTab,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;          
        } else if (routeName === 'Settings') {
          iconName = `ios-construct${focused ? '' : '-outline'}`;
        } 
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#2a5089',
      inactiveTintColor: 'gray',
    },
    barStyle: { backgroundColor: myStyle.bottomBarColor },
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
