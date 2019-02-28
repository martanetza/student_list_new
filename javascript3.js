"use strict";
const baseLink = "https://petlatkea.dk/2019/students1991.json";
const studentObject = {
  fullname: "-student name-",
  house: "-student house-",
  firstname: "-student first name-",
  lastname: "-student last name-",
  id: "-student index"
};
const arrayOfStudents = [];
let filterdList;
let filter;
function init() {
  document.querySelector("table").addEventListener("click", clickList);

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
    const uniqueId = uuidv4();

    const firstSpace = item.fullname.indexOf(" ");
    const lastSpace = item.fullname.lastIndexOf(" ");

    const newObject = Object.create(studentObject);
    newObject.fullname = item.fullname;
    newObject.house = item.house;
    newObject.firstname = item.fullname.slice(0, firstSpace);
    newObject.lastname = item.fullname.slice(lastSpace + 1);
    newObject.id = uniqueId;
    arrayOfStudents.push(newObject);
  });
  console.log(arrayOfStudents);

  filterList();
}
function filterList() {
  filterdList = arrayOfStudents.filter(filterOne);
  // console.log(filterdList);

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
      // display(filterdList);
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
  if (!filter || filter === "All") {
    return true;
  }
  if (item.house === filter) {
    return true;
  } else {
    return false;
  }
}

function clickList(event) {
  if (event.target.tagName === "BUTTON") {
    clickRemove(event);

    // console.log(event.target.id);
  }
}

function clickRemove(event) {
  function findById(id) {
    return arrayOfStudents.findIndex(obj => obj.id === id);
  }

  let toBeRemoved = findById(event.target.id);
  arrayOfStudents.splice(toBeRemoved, 1);

  console.log(toBeRemoved);
  filterList(arrayOfStudents);
}

function display(filterdList) {
  document
    .querySelectorAll(".name, .lastname, .place, .expel")
    .forEach(item => {
      item.remove();
    });

  filterdList.forEach(item => {
    let template = document.querySelector("template");

    const copy = template.cloneNode(true).content;
    copy.querySelector(".name").textContent = item.firstname;
    copy.querySelector(".lastname").textContent = item.lastname;
    copy.querySelector(".place").textContent = item.house;
    copy.querySelector("button").id = item.id;

    document.querySelector("table").appendChild(copy);
  });
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

init();
