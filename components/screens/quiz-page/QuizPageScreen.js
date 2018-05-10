import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

import { connect } from "react-redux";
import { updateState, updateTimer, updateQuiz } from "../../redux/actions";

import { shuffledQuizIndexes, getChoice } from "./utils/functions";
import TestConsole from "./views/TestConsole";
import TimerConsole from "./views/TimerConsole";
import SubmitButton from "./views/SubmitButton";

import { Color } from "../../utils/config";
import { addKeys } from "../../utils/utils";
import PropTypes from "prop-types";

class QuizPageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let category = navigation.getParam("category");
    return {
      headerTitle: "Take Quiz",
      headerTintColor: Color.primary
    };
  };

  componentWillUnmount() {
    this.clearIntervals();
    this.props.updateState({
      interval: null,
      interval2: null,
      button: "Start",
      counter: 1,
      answer: ""
    });
  }

  onPressStart = () => {
    // console.log(this.props.state.interval);
    this.selectedAnswers = [];
    this.totalCorrect = 0;

    this.question = null;
    this.indexes = shuffledQuizIndexes(this.props.settings.max_questions);

    //this.props.updateState({ button: "Cancel" });
    this.props.updateState({
      button: "Cancel",
      counter: 1
    });
    this.props.updateTimer({ min: 0, sec: 8 });
    this.clearIntervals();

    /* run quiz interval, can be interrupted at every 10ms chuck
       but code usually runs every 1 second 
    */
    if (!this.props.state.interval) {
      const interval = setInterval(this.runInterval(), 10);
      this.props.updateState({ counter: 1, interval });
    }
    // run async timer
    if (!this.props.state.interval2) {
      this.props.updateTimer({ min: 0, sec: 8 });
      const interval2 = setInterval(this.runTimer, 1000);
      this.props.updateState({ interval2 });
    }
  };

  runTimer = () => {
    timer = { ...this.props.timer };
    if (timer.sec === 0) {
      timer.sec = this.props.settings.max_sec;
    } else {
      timer.sec = timer.sec - 1;
    }
    this.props.updateTimer({ ...timer });
  };

  runInterval = () => {
    const interval = this.props.state.interval;
    const interval2 = this.props.state.interval2;

    //kick-start question
    if (this.question === null) {
      // reset timer
      const { max_min, max_sec } = this.props.settings;
      this.props.updateTimer({ min: max_min, sec: max_sec });

      this.question = this.getQuestion(
        this.props.state.category,
        this.indexes[this.props.state.counter - 1]
      );
      this.props.updateQuiz({ question: this.question });
    }

    //replenish with new question when timer reaches min=0, sec=0
    const timer_reached_zero =
      this.props.timer.min === 0 && this.props.timer.sec === 0;

    if (timer_reached_zero) {
      this.question = this.getQuestion(
        this.props.state.category,
        this.indexes[this.props.state.counter - 1]
      );
      this.props.updateQuiz({ question: this.question });

      // capture answered questions and compute total correct
      isCorrect =
        this.props.state.answer === this.question.correct ? true : false;
      if (isCorrect) this.totalCorrect++;

      const answerIndex = getChoice(this.props.state.answer);
      const answerLong =
        answerIndex > -1 ? this.question.radio[answerIndex].label : "";

      const correctIndex = getChoice(this.question.correct);
      const correctLong =
        correctIndex > -1 ? this.question.radio[correctIndex].label : "";

      this.selectedAnswers = [
        ...this.selectedAnswers,
        {
          count: this.props.state.counter,
          question: this.question.question,
          answer: this.props.state.answer,
          answerLong,
          correctAnswer: this.question.correct,
          correctLong,
          correct: isCorrect
        }
      ];

      this.selectedAnswers = this.selectedAnswers.map(addKeys);

      if (this.props.state.counter === this.props.settings.max_questions) {
        this.clearIntervals();

        this.quizResult = {
          selectedAnswers: this.selectedAnswers,
          totalCorrect: this.totalCorrect,
          totalQuestions: this.props.settings.max_questions
        };

        this.props.updateState({
          button: "Start",
          answer: "",
          counter: 1
        });

        this.props.navigation.navigate("ViewResult", {
          quizResult: this.quizResult
        });
        return this.runInterval;
      } else {
        this.props.updateState({ counter: this.props.state.counter + 1 });
        this.props.updateTimer({
          min: this.props.settings.max_min,
          sec: this.props.settings.max_sec
        });

        this.question = this.getQuestion(
          this.props.state.category,
          this.indexes[this.props.state.counter - 1]
        );
        this.props.updateQuiz({ question: this.question });
        this.props.updateState({ answer: "" });
      }
    }
    return this.runInterval;
  };

  onViewResult = () => {
    this.props.updateState({ button: "Start" });
    this.props.navigation.navigate("ViewResult", {});
  };

  onAnswer = answer => {
    this.props.updateState({ answer });
  };

  onSubmitAnswer = () => {
    this.props.updateTimer({ min: 0, sec: 0 });
  };

  onLongPressSubmitAnswer = choice => {
    this.onAnswer(choice);
    this.onSubmitAnswer();
  };

  onCancel = () => {
    this.props.updateState({ button: "Start", counter: 1, answer: "" });
    this.props.updateTimer({ min: 0, sec: 8 });
    this.clearIntervals();
    this.props.navigation.navigate("QuizPage");
  };

  clearIntervals() {
    console.log("clear interval running ");
    const interval = this.props.state.interval;
    const interval2 = this.props.state.interval2;

    if (interval) {
      clearInterval(interval);
      this.props.updateState({ interval: null });
    }
    if (interval2) {
      clearInterval(interval2);
      this.props.updateState({ interval2: null });
    }
  }

  getQuestion = (category, index) => {
    let quiz = null;
    switch (category) {
      case "Science":
        quiz = this.props.scienceQuestions[index];
        break;
      case "English":
        quiz = this.props.englishQuestions[index];
        break;
    }
    console.log("==== from getQuestion ====");
    console.log(quiz);
    let radio = [
      { label: quiz.a, value: "a" },
      { label: quiz.b, value: "b" },
      { label: quiz.c, value: "c" },
      { label: quiz.d, value: "d" }
    ];

    const question = {
      question: quiz.question,
      radio,
      answer: quiz.answer,
      correct: quiz.correct
    };
    return question;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TimerConsole
            button={this.props.state.button}
            timer={this.props.timer}
            counter={this.props.state.counter}
            quiz={this.props.quiz}
            max_questions={this.props.settings.max_questions}
            category={this.props.state.category}
          />

          <View>
            <TestConsole
              button={this.props.state.button}
              quiz={this.props.quiz}
              onAnswer={this.onAnswer}
              answer={this.props.state.answer}
              counter={this.props.state.counter}
              max_questions={this.props.settings.max_questions}
              onLongPressSubmitAnswer={this.onLongPressSubmitAnswer}
            />
          </View>

          <SubmitButton
            title={this.props.state.button}
            startHandler={this.onPressStart}
            viewResultHandler={this.onViewResult}
            onSubmitAnswerHandler={this.onSubmitAnswer}
            cancelHandler={this.onCancel}
            disableSubmit={this.props.state.answer ? false : true}
          />
        </ScrollView>
      </View>
    );
  }
}

// -------- PropTypes --------
QuizPageScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

// -------- Styling --------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 5,
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 10
  }
});

// -------- Setup Redux --------
const mapStateToProps = state => ({
  categories: state.categories,
  timer: state.timer,
  state: state.state,
  quiz: state.quiz,
  settings: state.settings,
  scienceQuestions: state.scienceQuestions,
  englishQuestions: state.englishQuestions
});

export default connect(mapStateToProps, {
  updateState,
  updateTimer,
  updateQuiz
})(QuizPageScreen);
