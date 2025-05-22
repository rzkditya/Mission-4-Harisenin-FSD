document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const todoPriority = document.getElementById("todo-priority");
    const addtodoButton = document.getElementById("add-todo-btn");
    const todoList = document.getElementById("todo-list");

    const addtodo = (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        const todoPriorityText = todoPriority.options[todoPriority.selectedIndex].text;
        if (!todoText) {
            return;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="todo-item">
                <input type="checkbox" class="checkbox"}>
                <span class="todo-text">${todoText}</span>
                <span class="todo-priority">${todoPriorityText}</span>
                <span class="todo-date">${new Date().toLocaleDateString()}</span>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        todoList.appendChild(li);
        todoInput.value = '';
        toggleEmptyState();
    };

    addtodoButton.addEventListener("click", addtodo);
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addtodo(e);
        }
    });

    function savedTodoList() {
        localStorage.setItem("123", "test");
    }

    savedTodoList();


});