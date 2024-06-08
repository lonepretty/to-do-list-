document.addEventListener('DOMContentLoaded', function() {
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');
    const taskDueDateInput = document.getElementById('task-due-date');
    const taskPrioritySelect = document.getElementById('task-priority');
    const addTaskBtn = document.getElementById('add-task-btn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    addTaskBtn.addEventListener('click', function() {
        if (!taskTitleInput.value) {
            alert("Task title is required!");
            return;
        }
        
        const dueDate = new Date(taskDueDateInput.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);  // Set the current time to midnight to compare only dates

        if (dueDate < currentDate) {
            alert("Due date cannot be in the past!");
            return;
        }

        const task = {
            id: Date.now(),
            title: taskTitleInput.value,
            description: taskDescInput.value,
            dueDate: taskDueDateInput.value,
            priority: taskPrioritySelect.value,
            completed: false
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        window.location.href = "index.html";  // Redirect to the main page after adding task
    });
});
