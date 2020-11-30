console.log("magic notes");
showNotes();
//localstorage se data retirve krna or dalna
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    Title: addTitle.value,
    Txt: addTxt.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  console.log(notesObj);
  showNotes();
});
//it will show data from localstorage.
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div id="dec" class="noteCard my-2 mx-2 card"  style="width: 18rem">
          <div class="card-body">
            <h5 id="imp" class="card-title">${element.Title}</h5>
            <p class="card-text">${element.Txt} </p>
            <button id="${index}" onclick="deleteNotes(this.id);" class="btn btn-primary">Delete</button>
          </div>
        </div>`;
  });
  let notesEln = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesEln.innerHTML = html;
  } else {
    notesEln.innerHTML = `Nothing to show. Use Add to Node to add notes.`;
  }
}
//deleting notes.
function deleteNotes(index) {
  console.log("i am deleting");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); //yeh us index se data del kr dy gi
  localStorage.setItem("notes", JSON.stringify(notesObj)); //is se localstorage update ho jae gi.
  showNotes();
}
//searching.
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputval = search.value;
  // console.log("searching",inputval);
  let cardTxt = document.getElementsByClassName("noteCard");
  Array.from(cardTxt).forEach(function (element) {
    let card = document.getElementsByTagName("p")[0].innerText;
    if (card.includes(inputval)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
