/*jshint esversion: 6 */
API = {};
const token = `?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphaHNrZWVAeWFob28uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTI3Mjg1NjMzLCJleHAiOjMxNTU1MjcyODU2MzN9.wQHAoNW9CtbWckhQmWM7Q2k-UV0SwT-zifkRrvgWo98`
API.getCategories = async () => {
  response = await fetch(`https://www.stratteos.us/api/category?${token}`);
  if (response.status != 200)
    throw `Server api error reponse.status=${response.status}`;
  categories = await response.json();
  return categories;
};

API.getQuestions = async category => {
  response = await fetch(`https://www.stratteos.us/api/questions/${category}?${token}`);
  if (response.status != 200)
    throw `Server api error reponse.status=${response.status}`;
  questions = await response.json();
  return questions;
};

export default API;
