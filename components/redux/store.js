import { createStore } from "redux";

import {
  updateScienceQuestions,
  updateEnglishQuestions,
  updateCategories,
  updateQuiz,
  updateTimer,
  updateState,
  updateSettings
} from "./actions";

import reducer from "./reducer";
import API from "../api/api";
import { addKeys } from "../utils/utils";

// default setting values
const MAX_MIN = 0;
const MAX_SEC = 8;
const MAX_QUESTIONS = 10;

const store = createStore(reducer);

// ================ Start Initialize Store ==================

// load considerable chunk of data from api.stratteos.us to redux store
(async () => {
  // https://api.stratteos.us/api/category
  categories = await API.getCategories();
  store.dispatch(updateCategories(categories.map(addKeys)));

  // https://api.stratteos.us/api/questions/science
  scienceQuestions = await API.getQuestions("science");
  store.dispatch(updateScienceQuestions(scienceQuestions));

  // https://api.stratteos.us/api/questions/english
  englishQuestions = await API.getQuestions("english");
  store.dispatch(updateEnglishQuestions(englishQuestions));
})();

store.dispatch(
  updateSettings({
    max_min: MAX_MIN,
    max_sec: MAX_SEC,
    max_questions: MAX_QUESTIONS
  })
);

store.dispatch(
  updateQuiz({
    totalQuestions: MAX_QUESTIONS,
    question: {},
    totalCorrect: 0
  })
);

store.dispatch(
  updateTimer({
    min: MAX_MIN,
    sec: MAX_SEC
  })
);

store.dispatch(
  updateState({
    button: "Start",
    answer: "",
    counter: 1,
    category: ""
  })
);

// ================ End Initialize Store ==================
console.log(store.getState());
export default store;
