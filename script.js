
console.log("To-Do List app loaded");

// Existing DOM element declarations
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCounter = document.getElementById("task-counter");

// Commit 11: Update the total task counter
function updateTaskCounter() {
    const count = taskList.children.length;
    taskCounter.textContent = `Total tasks: ${count}`;
}

// Handle task submission
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === "") {
        return;
    }

    // Create a new task
    const listItem = document.createElement("li");

    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;

    // Mark a task as completed or pending
    taskLabel.addEventListener("click", function () {
        listItem.classList.toggle("completed");
    });

    listItem.appendChild(taskLabel);

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        listItem.remove();

        // Update counter after deletion
        updateTaskCounter();
    });

    listItem.appendChild(deleteButton);

    // Add the task to the list
    taskList.appendChild(listItem);

    // Clear the input
    taskInput.value = "";

    // Update counter after adding a task
    updateTaskCounter();
});

// Display the initial count when the page loads
updateTaskCounter();
