import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Color } from "../utils/config";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { updateTimer, updateQuizResult } from "../redux/actions";

class ViewResultScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "View Result",
      headerTintColor: Color.primary
    };
  };

  componentDidMount() {
    const { quizResult } = this.props.navigation.state.params;
    this.props.updateQuizResult(quizResult);
  }

  onStartAgan = () => {
    this.props.updateTimer({ min: 0, sec: 8 });
    this.props.navigation.navigate("QuizPage", {});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.view1}>
          <Text style={styles.result}>
            Total Correct: {this.props.quizResult.totalCorrect}
          </Text>
          <Text style={styles.result}>
            Total Questions: {this.props.quizResult.totalQuestions}
          </Text>
          <Button title="Start Again" onPress={this.onStartAgan} />
        </View>

        <FlatList
          style={styles.flatlist1}
          renderItem={obj => <ResultRow item={obj.item} />}
          data={this.props.quizResult.selectedAnswers}
        />
      </View>
    );
  }
}

const ResultRow = props => {
  const resultColor = props.item.correct ? "green" : "red";
  return (
    <View style={styles.view2}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: resultColor
        }}
      >
        {props.item.count}. {props.item.question}
      </Text>
      <View style={styles.view3}>
        <Text>
          Answer: {props.item.answerLong}
        </Text>

        <ShowCorrect item={props.item} />
      </View>
    </View>
  );
};

const ShowCorrect = props => {
  if (props.item.correct) return null;
  return (
    <Text>
      Correct: {props.item.correctLong}
    </Text>
  );
};

// -------- PropTypes --------
ViewResultScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

ResultRow.propTypes = {
  item: PropTypes.object.isRequired
};

ShowCorrect.propTypes = {
  item: PropTypes.object.isRequired
};

// -------- Styling --------
var { gheight, gwidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10
  },
  result: {
    fontSize: 20,
    fontWeight: "bold"
  },
  view1: {
    marginBottom: 10
  },
  view2: {
    padding: 5,
    width: gwidth
  },
  view3: {
    marginLeft: 20
  },
  flatlist1: {
    marginTop: 5,
    flex: 1,
    width: 300
  }
});

// -------- Setup Redux --------
const mapStateToProps = state => ({
  quizResult: state.quizResult,
  state: state.state
});

export default connect(mapStateToProps, {
  updateTimer,
  updateQuizResult
})(ViewResultScreen);
