"use strict";
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";
const familyLink = "https://petlatkea.dk/2019/hogwarts/families.json";

const studentObject = {
  fullname: "-student name-",
  house: "-student house-",
  firstname: "-student first name-",
  lastname: "-student last name-",
  image: "-image-",
  imageLogo: "-imageLogo-",
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

  document.querySelector(".tableOfSquad").addEventListener("click", clickList);
  document.querySelector("#i_squad").addEventListener("click", addToIsquad);
  document
    .querySelector("#i_squad_remove")
    .addEventListener("click", removeFromIsquad);

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
    newObject.imageLogo = "images/" + item.house + ".png";
    newObject.image =
      "images/" +
      newObject.lastname.toLowerCase() +
      "_" +
      item.fullname.substring(0, 1).toLowerCase() +
      ".png";
    if (pureBlood.includes(item.fullname.slice(lastSpace + 1))) {
      newObject.blood = "pure";
    }
    if (halfBlood.includes(item.fullname.slice(lastSpace + 1))) {
      newObject.blood = "half";
    }

    arrayOfStudents.push(newObject);
  });
  const uniqueId = uuidv4();

  const myObject = Object.create(studentObject);
  myObject.fullname = "Marta Netza";
  myObject.house = "Gryffindor";
  myObject.firstname = "Marta";
  myObject.lastname = "Netza";
  myObject.id = uniqueId;
  myObject.i_squad = "false";
  myObject.blood = "half";
  arrayOfStudents.push(myObject);
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
      displaySquad(i_squad);
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
      displaySquad(i_squad);
    } else {
      display(filterdList);
      displaySquad(i_squad);
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
  if (event.target.tagName === "TD") {
    // alert(event.target.parentElement.dataset.indexNumber);
    showModal();
  }
}

function clickRemove(event) {
  function findById(id) {
    return arrayOfStudents.findIndex(obj => obj.id === id);
  }
  let toBeRemoved = findById(event.target.id);
  // arrayOfStudents.splice(toBeRemoved, 1);
  console.log(toBeRemoved);
  if (toBeRemoved === 34) {
    alert("no no no");
  } else {
    arrayOfStudents.splice(toBeRemoved, 1);
  }
  function findByIdSquad(id) {
    return i_squad.findIndex(obj => obj.id === id);
  }
  let toBeRemovedSquad = findByIdSquad(event.target.id);
  i_squad.splice(toBeRemovedSquad, 1);

  console.log(i_squad);
  filterList(arrayOfStudents);
  displaySquad(i_squad);
}

function display(filterdList) {
  document.querySelectorAll(".line").forEach(item => {
    item.remove();
  });

  filterdList.forEach(item => {
    let template = document.querySelector("template");

    const copy = template.cloneNode(true).content;
    copy.querySelector(".name").textContent = item.firstname;
    copy.querySelector("TR").dataset.indexNumber = item.id;

    copy.querySelector(".lastname").textContent = item.lastname;
    copy.querySelector(".place").textContent = item.house;
    copy.querySelector("button").id = item.id;
    copy.querySelector("input").value = item.lastname;

    document.querySelector("table").appendChild(copy);
  });
}

let i_squad = [];

function addToIsquad() {
  let checkBox = document.querySelectorAll(".i_squad input");
  checkBox.forEach((e, i) => {
    // if (e.checked == false) {
    //   alert(`Please use checkbox to add students the inquisitorial squad`);
    // }
    if (
      e.checked == true &&
      arrayOfStudents[i].blood == "pure" &&
      arrayOfStudents[i].i_squad == "false"
    ) {
      let studentIndex = findByName(e.value);
      arrayOfStudents[studentIndex].i_squad = "true";
      i_squad.push(arrayOfStudents[studentIndex]);
      e.checked = false;
      console.log(i_squad);
      console.log(`${e.value} should be added!`);
    }
    if (
      (e.checked == true && arrayOfStudents[i].blood == "muggel") ||
      (e.checked == true && arrayOfStudents[i].blood == "half")
    ) {
      alert(`${e.value} is not a pure blood wizard`);
      e.checked = false;
    }
    if (e.checked == true && arrayOfStudents[i].i_squad == "true") {
      alert(`${e.value} is already a member of the inquisitorial squad`);
      e.checked = false;
    }
  });
  displaySquad(i_squad);

  console.log(arrayOfStudents[0].i_squad);
}

function removeFromIsquad() {
  let checkBox = document.querySelectorAll(".i_squad input");
  // if (!checkBox.checked) {
  //   alert(`Please use checkbox to add students the inquisitorial squad`);
  // }

  checkBox.forEach((e, i) => {
    if (e.checked == true) {
      let studentIndex = findByName(e.value);
      let toBeRemovedIS = findByNameIsquad(e.value);
      arrayOfStudents[studentIndex].i_squad = "false";
      i_squad.splice(toBeRemovedIS, 1);

      e.checked = false;
      console.log(i_squad);
      console.log(`${e.value} should be removed!`);
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
    copy.querySelector("input").value = item.lastname;
    copy.querySelector(".line").dataset.indexNumber = item.id;

    copy.querySelector("button").remove();

    document.querySelector(".tableOfSquad").appendChild(copy);
  });
  autoRemoveFromI_squad();
}

function findByName(lastname) {
  return arrayOfStudents.findIndex(obj => obj.lastname === lastname);
}
function findByNameIsquad(lastname) {
  return i_squad.findIndex(obj => obj.lastname === lastname);
}

function showModal() {
  console.log("test");
  if (event.target.tagName !== "INPUT") {
    document.querySelector(".modal").classList.add("show");
  }

  console.log(document.querySelector(".line").dataset.indexNumber);

  arrayOfStudents.forEach(item => {
    if (item.id == event.target.parentElement.dataset.indexNumber) {
      document.querySelector(".logo img").src = item.imageLogo;

      document.querySelector("section img").src = item.image;
      document.querySelector(".fullName").textContent = item.fullname;
      document.querySelector(".house").textContent = item.house;
      document.querySelector(".bloodStatus").textContent = item.blood;
      if (item.i_squad === "false") {
        document.querySelector(".squadStatus").textContent = "not a member";
      } else {
        document.querySelector(".squadStatus").textContent = "a member";
      }
      if (item.house === "Hufflepuff") {
        document.querySelector(".modal").style.backgroundColor = "#f2c136";
        document.querySelector(".modal").style.borderColor = "#ca972c";
        document.querySelector(".logo").style.borderColor = "#ca972c";
        document.querySelector(".modal").style.color = "#161719";
      }
      if (item.house === "Slytherin") {
        document.querySelector(".modal").style.backgroundColor = "#e2e3e5";
        document.querySelector(".modal").style.borderColor = "#7e7f83";
        document.querySelector(".logo").style.borderColor = "#7e7f83";
        document.querySelector(".modal").style.color = "#15302b";
      }
      if (item.house === "Ravenclaw") {
        document.querySelector(".modal").style.backgroundColor = "#e7edeb";
        document.querySelector(".modal").style.borderColor = "#b9b7c5";
        document.querySelector(".logo").style.borderColor = "#b9b7c5";
        document.querySelector(".modal").style.color = "#121d3d";
      }
      if (item.house === "Gryffindor") {
        document.querySelector(".modal").style.backgroundColor = "#f7f6d5";
        document.querySelector(".modal").style.borderColor = "#dcaf3a";
        document.querySelector(".logo").style.borderColor = "#dcaf3a";
        document.querySelector(".modal").style.color = "#86172a";
      }

      //h: background: f2c136 line: ca972c font:161719
      //s: background:  e2e3e5 line: 7e7f83 font:15302b
      //r: background: e7edeb line: b9b7c5 font: 121d3d
      //g: background: f7f6d5 line: dcaf3a font: 86172a
    }
  });
}
document.querySelector(".close").onclick = function() {
  document.querySelector(".modal").classList.remove("show");
  display(filterdList);
  displaySquad(i_squad);
};

function autoRemoveFromI_squad() {
  if (i_squad.length > 0) {
    setTimeout(function() {
      let oneOut = i_squad.pop();
      let studentIndex = findById(oneOut.id);
      arrayOfStudents[studentIndex].i_squad = "false";

      displaySquad(i_squad);
      function findById(id) {
        return arrayOfStudents.findIndex(obj => obj.id === id);
      }
      console.log(oneOut.id);
    }, 19400);
  }
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
init();
