"use strict";
const baseLink = "https://petlatkea.dk/2019/students1991.json";
const studentObject = {
  fullname: "-student name-",
  house: "-student house-",
  firstname: "-student first name-",
  lastname: "-student last name-"
};
const arrayOfStudents = [];
let filter;
function init() {
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
    const firstSpace = item.fullname.indexOf(" ");
    const lastSpace = item.fullname.lastIndexOf(" ");

    const newObject = Object.create(studentObject);
    newObject.fullname = item.fullname;
    newObject.house = item.house;
    newObject.firstname = item.fullname.slice(0, firstSpace);
    newObject.lastname = item.fullname.slice(lastSpace + 1);

    arrayOfStudents.push(newObject);
  });
  console.log(arrayOfStudents);

  filterList();
}
function filterList() {
  const filterdList = arrayOfStudents.filter(filterOne);
  console.log(filterdList);

  sortList(filterdList);
}

function sortList(filterdList) {
  document.querySelector("#sortBy").addEventListener("change", sortingOption);
  sortingOption();
  function sortingOption() {
    if (document.querySelector("select").value === "firstName") {
      filterdList.sort(function(a, b) {
        if (a.firstname < b.firstname) {
          return -1;
        } else {
          return +1;
        }
      });
      display(filterdList);
    }
    if (document.querySelector("select").value === "lastName") {
      filterdList.sort(function(a, b) {
        if (a.lastname < b.lastname) {
          return -1;
        } else {
          return +1;
        }
      });
      display(filterdList);
    }
    if (document.querySelector("select").value === "house") {
      filterdList.sort(function(a, b) {
        if (a.house < b.house) {
          return -1;
        } else {
          return +1;
        }
      });
      display(filterdList);
    } else {
      display(filterdList);
    }
  }
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
  document.querySelectorAll(".name, .lastname, .place").forEach(item => {
    item.remove();
  });

  filterdList.forEach(item => {
    let template = document.querySelector("template");

    const copy = template.cloneNode(true).content;
    copy.querySelector(".name").textContent = item.firstname;
    copy.querySelector(".lastname").textContent = item.lastname;
    copy.querySelector(".place").textContent = item.house;
    document.querySelector("table").appendChild(copy);
  });

  console.log(filterdList);
}
init();
