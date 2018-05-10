// action types
export const UPDATE_SCIENCE_QUESTIONS = "UPDATE_SCIENCE_QUESTIONS";
export const UPDATE_ENGLISH_QUESTIONS = "UPDATE_ENGLISH_QUESTIONS";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_QUIZ = "UPDATE_QUIZ";
export const UPDATE_TIMER = "UPDATE_TIMER";
export const UPDATE_STATE = "UPDATE_STATE";
export const UPDATE_SETTINGS = "UPDATE_SETTINGS";
export const UPDATE_QUIZ_RESULT = "UPDATE_QUIZ_RESULT";

// action creators
export const updateScienceQuestions = update => ({
  type: UPDATE_SCIENCE_QUESTIONS,
  payload: update
});

export const updateEnglishQuestions = update => ({
  type: UPDATE_ENGLISH_QUESTIONS,
  payload: update
});

export const updateCategories = update => ({
  type: UPDATE_CATEGORIES,
  payload: update
});

export const updateQuiz = update => ({
  type: UPDATE_QUIZ,
  payload: update
});

export const updateTimer = update => ({
  type: UPDATE_TIMER,
  payload: update
});

export const updateState = update => ({
  type: UPDATE_STATE,
  payload: update
});

export const updateSettings = update => ({
  type: UPDATE_SETTINGS,
  payload: update
});

export const updateQuizResult = update => ({
  type: UPDATE_QUIZ_RESULT,
  payload: update
});
