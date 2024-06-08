document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-task')) {
            const taskId = event.target.parentElement.parentElement.dataset.id;
            tasks = tasks.filter(task => task.id != taskId);
            saveTasks();
            renderTasks();
        } else if (event.target.classList.contains('toggle-completion')) {
            const taskId = event.target.parentElement.parentElement.dataset.id;
            const task = tasks.find(task => task.id == taskId);
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    });

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            li.dataset.id = task.id;

            const statusDot = document.createElement('span');
            statusDot.classList.add('status-dot', task.completed ? 'completed' : 'incomplete');

            li.innerHTML = `
                <span>
                    ${statusDot.outerHTML}
                    <strong>${task.title}</strong> (${task.priority})
                    <p>${task.description}</p>
                    <small>Due: ${task.dueDate}</small>
                </span>
                <div class="actions">
                    <button class="toggle-completion">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button class="delete-task">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    renderTasks();
});
