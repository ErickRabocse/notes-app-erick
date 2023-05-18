//create variables to select DOM elements
let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function (e) {
  // e.preventDefault();
  let addTitle = document.getElementById("note-title");
  let addText = document.getElementById("note-text");
  //check if there's anything in the input & text area
  if (addTitle.value == "" || addText.value == "") {
    return alert("Please fill out the note");
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    // initializing an empty array if the notes obj doesn't exist yet
    notesObj = [];
  } else {
    //if notes exists, store its Object version into the previously empty notesObj
    notesObj = JSON.parse(notes);
  }
  //creating a template Object to store the values of the note form
  let myObj = {
    title: addTitle.value,
    text: addText.value,
  };
  //adding the objects to the notesObj array
  notesObj.push(myObj);
  //save the values into localStorage
  localStorage.setItem("notes", JSON.stringify(notesObj));
  //removing the values from the form
  addTitle.value = "";
  addText.value = "";
  //show/display the notes
  showNotes();
});

//SHOW NOTES ON THE PAGE
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
        <div id="note">
              <p class="note-counter">Note ${index + 1}</p>
              <h3 class="note-title">${element.title}</h3>
              <p class="note-text" >${element.text}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete</button>
              <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit</button>
            </div>
        `;
  });
  let noteElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = "Nothing to show. Please create a note";
  }
}

//FUNCTION TO DELETE NOTES
function deleteNote(index) {
  let confirmDelete = confirm("Are you sure you want to delete thie note?");
  if (confirmDelete == true) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}

//FUNCTION TO EDIT (REMOVE ATTRIBUTE READONLY)
function editNote(index) {
  let notes = localStorage.getItem("notes");
  let addTitle = document.getElementById("note-title");
  let addText = document.getElementById("note-text");
  if (addTitle.value !== "" || addText.value !== "") {
    return alert("Please clear the form before editing a note.");
  }
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  // notesObj.findIndex((element, index) => {
  //   addTitle.value = element.title;
  //   addText.value = element.text;
  // });
  addTitle.value = notesObj[index].title;
  addText.value = notesObj[index].text;

  notesObj.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

showNotes();
