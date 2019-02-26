"use strict";
const baseLink = "http://petlatkea.dk/2019/students1991.json";
const studentObject = {
  fullname: "-student name-",
  house: "-student house-"
};
const arrayOfStudents = [];
let filter;
init();
function init() {
  console.log("init");

  getJSON();

  document.querySelectorAll("p").forEach(elm => {
    elm.addEventListener("click", setFilter);
  });
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
  });

  filterList();
}
function filterList() {
  arrayOfStudents.filter(filterOne);
  const filterdList = arrayOfStudents.filter(filterOne);
  // console.log(filterdList);

  display(filterdList);

  sortList(filterdList);
}

function sortList(filterdList) {
  filterdList.sort(function(a, b) {
    if (a.fullname < b.fullname) {
      return -1;
    } else {
      return +1;
    }
  });

  display(filterdList);
}

function setFilter(event) {
  filter = event.target.innerText;
  filterList();
}

function filterOne(item) {
  //
  if (!filter) {
    return true;
  }
  if (item.house === filter) {
    return true;
  } else {
    return false;
  }
}

function display(filterdList) {
  document.querySelectorAll(".name").forEach(item => {
    item.remove();
  });
  document.querySelectorAll(".place").forEach(item => {
    item.remove();
  });
  filterdList.forEach(item => {
    let template = document.querySelector("template");

    const copy = template.cloneNode(true).content;
    copy.querySelector(".name").textContent = item.fullname;
    copy.querySelector(".place").textContent = item.house;
    document.querySelector("table").appendChild(copy);
  });

  console.log(filterdList);
}
init();
