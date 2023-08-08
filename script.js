const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("addBtn");
const completed = document.getElementById("task-done");

// Function to add a new task
addBtn.onclick = function addTask() {
    if (inputBox.value === '') {
        inputBox.classList.toggle("invalid");
        inputBox.attributes[2].value = "You must write something!";
    }
    else {
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        listContainer.prepend(li);
        let span = document.createElement("span");
        span.innerText = "\u00d7";
        li.appendChild(span);
        inputBox.attributes[2].value = "Add a task";
    }
    inputBox.value = "";
    saveData();
};

// Checked the task or remove the task 
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.add("checked");
        completed.style.display = "block";
        completed.append(e.target);
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

completed.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.remove("checked");
        listContainer.prepend(e.target);
        if (this.childNodes.length === 3) {
            this.style.display = "none";
        }
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        if (this.childNodes.length === 3) {
            this.style.display = "none";
        }
        saveData();
    }
}, false);

// Keyboard event listener - press Enter
inputBox.addEventListener("keyup", function (e) {
    if (e.code === "Enter") {
        addBtn.onclick();
    }
});

// Local storage function
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
