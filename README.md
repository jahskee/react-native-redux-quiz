# Quiz App - Time Pressured

## Intro

A time-pressured quiz app that gives users eight seconds to answer each question.
The number of questions and categories can be configured and is scalable, but for this app, it was set to a maximum of ten questions and two categories (Science, English). A considerable chunk of data is
fetched from my REST server api.stratteos.us a server I developed using Node.js and MongoDB. 
A considerable amount of data (not too large) is copied to Redux store. One of my optimization 
goals is to move all stying to Stylesheet object instead of within tags.

Created 2 setInterval functions one for timer and one that tracks movement to next question until 
it hits the maximum questions, then the result page will show up.

## Requirements

Must use redux - done

Must make at least one network call - done

Must have at least one stack navigator - done

Must have at least one tab navigator - done

Must be at least as large in scope as the previous projects - done


## Screen Cap

![alt text](https://image.ibb.co/gdUekd/photo1.jpg)
![alt text](https://image.ibb.co/jUBEJy/photo2.jpg)
![alt text](https://image.ibb.co/eENMyy/photo3.jpg)
![alt text](https://image.ibb.co/d6hzkd/photo4.jpg)
![alt text](https://image.ibb.co/cMxody/photo5.jpg)
![alt text](https://image.ibb.co/d14C5d/photo6.jpg)
![alt text](https://image.ibb.co/eSi5Qd/photo7.jpg)

## Back-end code in Node.JS & mongoDB

https://github.com/jahskee/quiz-node-rest-back-end

## REST

https://api.stratteos.us/api/category

https://api.stratteos.us/api/questions/science

https://api.stratteos.us/api/questions/english
