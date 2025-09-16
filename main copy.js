let newNoteContent;
const form = document.getElementById('form');


function addNewNote() {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const formObject = Object.fromEntries(formData.entries());

        newNoteContent = formObject;

        console.log(newNoteContent.title);

        if(newNoteContent.title){
            createNote();
            form.reset();
        }
    })
}

function clearNewNote() {
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        form.reset();
    })
}

function createNote(){
    const createdNote = document.createElement("li");
    createdNote.className = "note";
    createdNote.innerHTML = 
    `
    <div class="note_group">
                                    <div class="note_group_frame">
                                        <h3 class="note_group_frame_title">${newNoteContent.title}</h3>
                                        <p class="note_group_frame_description">${newNoteContent.description}</p>
                                    </div>
                                    <div class="note_group_frame_buttons">
                                        <button class="note_group_frame_buttons_done">Done</button>
                                        <button class="note_group_frame_buttons_edit">Edit</button>
                                    </div>
                                </div>
    `

    const notesList = document.getElementById("notesList");
    notesList.appendChild(createdNote);

}

addNewNote();
clearNewNote();
