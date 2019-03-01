"use strict";
const baseLink = "https://petlatkea.dk/2019/students1991.json";
const familyLink = "http://petlatkea.dk/2019/hogwarts/families.json";

const studentObject = {
  fullname: "-student name-",
  house: "-student house-",
  firstname: "-student first name-",
  lastname: "-student last name-",
  id: "-student index",
  blood: "blood",
  i_squad: "i_squad"
};

const arrayOfStudents = [];
let filterdList;
let filter;
function init() {
  getFamily();
  document.querySelector("table").addEventListener("click", clickList);

  document.querySelectorAll("p").forEach(elm => {
    elm.addEventListener("click", setFilter);
  });
}

function getJSON() {
  fetch(baseLink)
    .then(pro => pro.json())
    .then(makeObject);
}

function getFamily() {
  fetch(familyLink)
    .then(pro => pro.json())
    .then(checkBlood);
}
let familyArr;
function checkBlood(family) {
  familyArr = family;
  halfBlood = family.half;
  pureBlood = family.pure;
  getJSON();
}
let halfBlood;
let pureBlood;
function makeObject(studentList) {
  // console.log(familyArr);
  // console.log(halfBlood);
  // console.log(pureBlood);
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
    newObject.i_squad = "false";
    newObject.blood = "muggel";
    if (pureBlood.includes(item.fullname.slice(lastSpace + 1))) {
      newObject.blood = "pure";
    }
    if (halfBlood.includes(item.fullname.slice(lastSpace + 1))) {
      newObject.blood = "half";
    }
    // if (document.querySelector(".i_squad input").checked) {
    //   newObject.i_squad = "true";
    // }

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
  }
  if (event.target.tagName === "INPUT") {
    clickCheck(event);
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
  document.querySelectorAll(".line").forEach(item => {
    item.remove();
  });

  filterdList.forEach(item => {
    let template = document.querySelector("template");

    const copy = template.cloneNode(true).content;
    copy.querySelector(".name").textContent = item.firstname;
    copy.querySelector(".lastname").textContent = item.lastname;
    copy.querySelector(".place").textContent = item.house;
    copy.querySelector("button").id = item.id;
    copy.querySelector("input").value = item.lastname;

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

function clickCheck(event) {
  console.log(document.querySelector(".i_squad input").checked);
  document.querySelector("#i_squad").addEventListener("click", addToIsquad);
}

let i_squad = [];

function addToIsquad() {
  let checkBox = document.querySelectorAll(".i_squad input");
  checkBox.forEach((e, i) => {
    console.log(i);
    if (
      e.checked == true &&
      arrayOfStudents[i].blood == "pure" &&
      arrayOfStudents[i].i_squad == "false"
    ) {
      //find the index of en elemnt
      //push it to a new array
      //change value of property of i_squad
      let studentIndex = findByName(e.value);

      arrayOfStudents[studentIndex].i_squad = "true";
      i_squad.push(arrayOfStudents[studentIndex]);
      e.checked = false;

      console.log(i_squad);
      console.log(`${e.value} should be added!`);

      // e.onclick = function() {
      //   e.checked = true;
      // };
    }
  });
  displaySquad(i_squad);

  console.log(arrayOfStudents[0].i_squad);
}

function displaySquad(filterdList) {
  document.querySelectorAll(".tableOfSquad .line").forEach(item => {
    item.remove();
  });

  filterdList.forEach(item => {
    let template = document.querySelector("template");

    const copy = template.cloneNode(true).content;
    copy.querySelector(".name").textContent = item.firstname;
    copy.querySelector(".lastname").textContent = item.lastname;
    copy.querySelector(".place").textContent = item.house;
    copy.querySelector("button").id = item.id;
    copy.querySelector("input").value = item.lastname;

    document.querySelector(".tableOfSquad").appendChild(copy);
  });
}

function findByName(lastname) {
  return arrayOfStudents.findIndex(obj => obj.lastname === lastname);
}
init();
