/*jshint esversion: 6 */
API = {};

API.getCategories = async () => {
  response = await fetch("https://api.stratteos.us/api/category");
  if (response.status != 200)
    throw `Server api error reponse.status=${response.status}`;
  categories = await response.json();
  return categories;
};

API.getQuestions = async category => {
  response = await fetch(`https://api.stratteos.us/api/questions/${category}`);
  if (response.status != 200)
    throw `Server api error reponse.status=${response.status}`;
  questions = await response.json();
  return questions;
};

export default API;
