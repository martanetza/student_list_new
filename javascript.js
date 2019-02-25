let template = document.querySelector("template");
let filterAll = true;

fetch("http://petlatkea.dk/2019/students1991.json")
  .then(promise => promise.json())
  .then(items => showList(items));

function showList(items) {
  items.forEach(showSingleItem);

  function showSingleItem(e) {
    // const copy = template.cloneNode(true).content;
    // copy.querySelector(".name").textContent = e.fullname;
    // copy.querySelector(".place").textContent = e.house;
    // document.querySelector("table").appendChild(copy);

    document.querySelectorAll("p").forEach(elm => {
      elm.addEventListener("click", checkFilter);
    });

    function checkFilter() {
      filtered = false;
      let house = e.house;
      let filter = event.target.innerText;

      if (filter == house) {
        const copy = template.cloneNode(true).content;
        copy.querySelector(".name").textContent = e.fullname;
        copy.querySelector(".place").textContent = e.house;
        document.querySelector("table").appendChild(copy);
      }
    }
  }
}
