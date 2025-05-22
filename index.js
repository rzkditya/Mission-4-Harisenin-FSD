document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.querySelector('form');
    const todoInput = document.getElementById('todo-input');
    const todoPriority = document.getElementById('todo-priority');
    const todoListUl = document.getElementById('todo-list');

    let allTodos = [];

    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTodo();
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        const todoPriorityText = todoPriority.options[todoPriority.selectedIndex].text;
        const todoPriorityValue = todoPriority.options[todoPriority.selectedIndex].value;
        if (todoText.length > 0) {
            const newTodo = {
                text: todoText,
                priority: priorityValue,
                date: new Date().toLocaleDateString()
            }
            allTodos.push(newTodo);
            updateTodoList();
            todoInput.value = '';
        }
        
    }
    
    function updateTodoList() {
        todoListUl.innerHTML = '';
        allTodos.forEach((todo, index) => {
            const todoItem = createTodoItem(todo, index);
            todoListUl.appendChild(todoItem);
        });
    }

    function createTodoItem(todo, index) {
        const todoId = "todo-" + index;
        const todoLi = document.createElement('li');
        todoLi.className = "todo";

        todoLi.innerHTML = `
            <div class="todo-item">
                <input type="checkbox" class="checkbox" id="${todoId}">
                <label for="${todoId}" class="todo-text">${todo.text}</label>
                <label class="todo-priority">${todo.priority}</label>
                <span class="todo-date">${todo.date}</span>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        /*
        todoLi.innerHTML = `
            <div class="todo-item">
                <input type="checkbox" class="checkbox id=""}>
                <label for="" class="todo-text">${todo}</label>
                <span class="todo-priority">${priority}</span>
                <span class="todo-date">${new Date().toLocaleDateString()}</span>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        */
        return todoLi;
    }
});

