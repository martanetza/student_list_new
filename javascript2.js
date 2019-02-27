let template = document.querySelector("template");
let filterAll = true;
let allStudents = null;
fetch("http://petlatkea.dk/2019/students1991.json")
  .then(promise => promise.json())
  .then(items => storeList(items));

function storeList(items) {
  allStudents = items;
  showList(items);
}

function showList(items) {
  items.forEach(showSingleItem);

  items.forEach(check);

  function check(element, index, array) {
    // console.log(element, index, array);
    array.filter(test);
    function test(element) {
      if (element.house === "Hufflepuff") {
        console.log("test");
        return true;
      } else {
        return false;
      }
    }
  }
  function showSingleItem(e) {
    console.log(e.fullname);
    const copy = template.cloneNode(true).content;
    copy.querySelector(".name").textContent = e.fullname;
    copy.querySelector(".place").textContent = e.house;
    document.querySelector("table").appendChild(copy);

    document.querySelectorAll("p").forEach(elm => {
      elm.addEventListener("click", checkFilter);
    });
  }
  function checkFilter(event) {
    document.querySelectorAll(".name").forEach(e => {
      e.remove();
    });
    document.querySelectorAll(".place").forEach(e => {
      e.remove();
    });
    showList(items);
    function showList(items) {
      items.forEach(showFiltredItems);

      function showFiltredItems(e) {
        let house = e.house;
        let filter = event.target.innerText;

        if (filter === house) {
          const copy = template.cloneNode(true).content;
          copy.querySelector(".name").textContent = e.fullname;
          copy.querySelector(".lastname").textContent = e.house;
          document.querySelector("table").appendChild(copy);
        }
      }
    }
  }
}
