export const shuffledQuizIndexes = totalQuestions => {
  randomQuiz = new Set();
  while (randomQuiz.size !== totalQuestions) {
    rand = Math.floor(Math.random() * 10);
    randomQuiz.add(rand);
  }
  return [...randomQuiz];
};

export const getChoice = letter => {
  if (!letter || letter == undefined) return -1;

  let arr = [];
  arr["a"] = 0;
  arr["b"] = 1;
  arr["c"] = 2;
  arr["d"] = 3;
  arr["e"] = 4;

  return arr[letter];
};

Number.prototype.zeroPad = function() {
  return this.toString().padStart(2, "0");
};
