let newNoteContent;
const form = document.getElementById('form');
let tasks = [];
let editingTaskId = null;
let currentFilter = "all";

function addNewNote() {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const formObject = Object.fromEntries(formData.entries());



        if (formObject.title.trim()) {
            const newTask = {
                id: Date.now(),
                title: formObject.title,
                description: formObject.description,
                done: false
            }

            tasks.push(newTask);
        updateLocalStorage();
        renderNotes();
        form.reset();
        }
    })
}


function renderNotes(filter = currentFilter) {
    currentFilter = filter;
    const notesList = document.getElementById("notesList");
    notesList.innerHTML = "";
    const navAll = document.getElementById("navAll");
    const navCurrent = document.getElementById("navCurrent");
    const navDone = document.getElementById("navDone");

    let filteredTasks = [];

    [navAll, navCurrent, navDone].forEach(nav => {
        nav.classList.remove("active");
        nav.classList.add("inactive");
    })

    switch (filter) {
        case "done":
            filteredTasks = tasks.filter(task => task.done);
            navDone.classList.add("active");
            navDone.classList.remove("inactive");
            break;
        case "current":
            filteredTasks = tasks.filter(task => !task.done);
            navCurrent.classList.add("active");
            navCurrent.classList.remove("inactive");
            break;
        default:
            filteredTasks = tasks;
            navAll.classList.add("active");
            navAll.classList.remove("inactive");
    }

    filteredTasks.forEach(task => {
        const note = document.createElement("li");
        note.className = "note";
        note.innerHTML = 
        `
    <div class="note_group">
                                    <div class="note_group_frame">
                                        <h3 class="note_group_frame_title">${task.title}</h3>
                                        <p class="note_group_frame_description">${task.description}</p>
                                    </div>
                                    <div class="note_group_frame_buttons">
                                        <button class="note_group_frame_buttons_done">${task.done ? "Undo" : "Done"}</button>
                                        <button class="note_group_frame_buttons_edit">Edit</button>
                                    </div>
                                </div>
    `

    const [doneBtn, editBtn] = note.querySelectorAll('button');

    doneBtn.addEventListener("click", () => toggleDone(task.id));
    editBtn.addEventListener("click", () => editNote(task.id));

    notesList.appendChild(note);

    })

    
}

function toggleDone(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.done = !task.done;
        updateLocalStorage();
        renderNotes();
    }
}

function editNote(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingTaskId = id;


        document.getElementById("editTitle").value = task.title;
        document.getElementById("editDescription").value = task.description;

        document.querySelector(".editTask_frame").style.display = "flex";
    }
}

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem("tasks");
    if (data) {
        tasks = JSON.parse(data);
        renderNotes();
    }
}

function editForm() {
    const editForm = document.getElementById("editForm");
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const updatedTitle = document.getElementById("editTitle").value.trim();
        const updatedDescription = document.getElementById("editDescription").value.trim();

        if (updatedTitle) {
            const task = tasks.find(t => t.id === editingTaskId);
            if (task) {
                task.title = updatedTitle;
                task.description = updatedDescription;
                updateLocalStorage();
                renderNotes();
            }
        }

        closeEditForm();
    })
}

function closeEditForm() {
    editingTaskId = null;
    document.getElementById("editForm").reset();
    document.querySelector(".editTask_frame").style.display = "none";
}

function clearNewNote() {
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        form.reset();
    })
}

function deleteNote () {
    document.getElementById("editDeleteBtn").addEventListener("click", () => {

        document.getElementById("confirmationForm").style.display = "flex";
})
}


function closeConfirmationForm() {
    const confirmationForm = document.getElementById("confirmationForm");
    confirmationForm.style.display = "none";
    
}


document.querySelectorAll(".navbar_list_el_link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = e.target.getAttribute("data-filter");
        renderNotes(filter);
    })
})

function buttons() {
document.getElementById("editCancelBtn").addEventListener("click", () => {
    closeEditForm();
})


document.getElementById("confirmationBtnNo").addEventListener("click", () => {
    closeConfirmationForm();
})

document.getElementById("confirmationBtnYes").addEventListener("click", () => {

    if (editingTaskId !== null) {
        tasks = tasks.filter(task => task.id !== editingTaskId);
        updateLocalStorage();
        renderNotes();
        closeEditForm();
    }
    closeConfirmationForm();
})
}


document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    buttons();
    addNewNote();
    clearNewNote();
    editForm();
    deleteNote();
});











