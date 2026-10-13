
console.log("To-Do List app loaded");

// DOM element declarations
const clearAllButton = document.getElementById("clear-all-btn");
const errorMessage = document.getElementById("error-message");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const taskCounter = document.getElementById("task-counter");
const completedCounter = document.getElementById("completed-counter");
const pendingCounter = document.getElementById("pending-counter");

// Update task counts
function updateTaskCounter() {
    const totalTasks = taskList.children.length;
    const completedTasks =
        taskList.querySelectorAll("li.completed").length;
    const pendingTasks = totalTasks - completedTasks;

    taskCounter.textContent = `Total tasks: ${totalTasks}`;
    completedCounter.textContent = `Completed: ${completedTasks}`;
    pendingCounter.textContent = `Pending: ${pendingTasks}`;
}

// Check whether a task already exists
function taskAlreadyExists(taskText) {
    const existingTasks = taskList.querySelectorAll("li span");

    return Array.from(existingTasks).some(function (task) {
        return task.textContent.toLowerCase() ===
            taskText.toLowerCase();
    });
}

// Handle adding tasks
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === "") {
        errorMessage.textContent = "Please enter a task!";
        taskInput.focus();
        return;
    }

    // Prevent duplicate tasks
    if (taskAlreadyExists(taskText)) {
        errorMessage.textContent = "This task already exists!";
        taskInput.focus();
        return;
    }

    errorMessage.textContent = "";

    // Create list item
    const listItem = document.createElement("li");

    // Create task text
    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;

    // Toggle completed status
    taskLabel.addEventListener("click", function () {
        listItem.classList.toggle("completed");
        updateTaskCounter();
    });

    listItem.appendChild(taskLabel);

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Delete task with confirmation
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

    // Add task to the list
    taskList.appendChild(listItem);

    // Clear input after adding
    taskInput.value = "";
    errorMessage.textContent = "";

    // Focus input for the next task
    taskInput.focus();

    // Update task counts
    updateTaskCounter();
});

// Initialize task counters
updateTaskCounter();
// Clear all tasks with confirmation
clearAllButton.addEventListener("click", function () {
    if (taskList.children.length === 0) {
        errorMessage.textContent = "There are no tasks to clear!";
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmed) {
        taskList.innerHTML = "";
        errorMessage.textContent = "";
        updateTaskCounter();
        taskInput.focus();
    }
});