
console.log("To-Do List app loaded");

// DOM element declarations
const errorMessage = document.getElementById("error-message");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const taskCounter = document.getElementById("task-counter");
const completedCounter = document.getElementById("completed-counter");
const pendingCounter = document.getElementById("pending-counter");

// Commit 11 and 12: Update task counts
function updateTaskCounter() {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll("li.completed").length;
    const pendingTasks = totalTasks - completedTasks;

    taskCounter.textContent = `Total tasks: ${totalTasks}`;
    completedCounter.textContent = `Completed: ${completedTasks}`;
    pendingCounter.textContent = `Pending: ${pendingTasks}`;
}

// Handle adding tasks
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

if (taskText === "") {
    errorMessage.textContent = "Please enter a task!";
    taskInput.focus();
    return;
}

errorMessage.textContent = "";

    const listItem = document.createElement("li");

    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;

    // Toggle completed status
    taskLabel.addEventListener("click", function () {
        listItem.classList.toggle("completed");
        updateTaskCounter();
    });

    listItem.appendChild(taskLabel);

   
    // Delete task with confirmation
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        const confirmed = confirm(
            "Are you sure you want to delete this task?"
        );

        if (confirmed) {
            listItem.remove();
            updateTaskCounter();
        }
    });

    

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

   
    // Clear input after adding
    taskInput.value = "";

    // Remove any previous error message
    errorMessage.textContent = "";

    // Focus the input for the next task
    taskInput.focus();

    // Update task counts
    updateTaskCounter();
