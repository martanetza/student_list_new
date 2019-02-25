"use strict";
const baseLink = "http://petlatkea.dk/2019/students1991.json";
const studentObject = {
  fullname: "-student name-",
  house: "-student house-"
};
const arrayOfStudents = [];

init();
function init() {
  console.log("init");

  getJSON();
}

function getJSON() {
  console.log("getJSON");
  fetch(baseLink)
    .then(pro => pro.json())
    .then(makeObject);
}
function makeObject(studentList) {
  studentList.forEach(item => {
    const newObject = Object.create(studentObject);
    newObject.fullname = item.fullname;
    newObject.house = item.house;

    arrayOfStudents.push(newObject);
    console.log(arrayOfStudents);
  });
}
