const notesContainer = document.querySelector(".notes-container");
const button = document.querySelector(".btn");

// Load notes from local storage when the page loads
function loadNotes() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notesContainer.innerHTML = storedNotes;
    }
}
loadNotes();

// Save notes to local storage
function storage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener for button click to add a new note
button.addEventListener("click", () => {
    let input = document.createElement("p");
    let img = document.createElement("img");
    input.className = "input";
    input.setAttribute("contenteditable", "true");
    img.src = "https://i.postimg.cc/xjghQcns/icons8-delete.gif";
    notesContainer.appendChild(input).appendChild(img); // display

    storage(); // Save notes to local storage after adding a new note
});

// Event delegation for handling delete and edit actions
notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this note!",
            // icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                e.target.parentElement.remove();
                storage(); // Save notes to local storage after deleting a note
                swal("Oops! Your note has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your note is safe!");
            }
        });
    } else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input");
        notes.forEach((nt) => {
            nt.onkeyup = function () {
                storage();
            };
        });
    }
});

// Handle line breaks when Enter key is pressed
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
