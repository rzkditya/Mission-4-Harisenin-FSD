document.addEventListener("DOMContentLoaded", function () {
    const profileName = document.querySelector(".username");
    const profilePosition = document.querySelector(".user-position");
    const menuDate = document.querySelector("#date");
    const menuTime = document.querySelector("#time");

    const todoInput = document.getElementById("todo-input");
    const todoPriority = document.getElementById("todo-priority");
    const todoDate = document.getElementById("todo-date");
    const submitButton = document.getElementById("submit-btn");
    const todoCheckbox = document.querySelector(".checkbox");
    const todoUl = document.getElementById("todo-ul");


    profileName.innerHTML = "Rizky Aditya";
    profilePosition.innerHTML = "Web Developer";

    setInterval(() => {
        const date = new Date();
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        menuDate.innerHTML = date.toLocaleDateString("id-ID", options);
        menuTime.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }, 1000);

    const addtodo = (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        const todoPriorityText = todoPriority.options[todoPriority.selectedIndex].text;
        const todoDateText = todoDate.value;
        if (!todoText) {
            return;
        }

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="todo-item">
                <input type="checkbox" class="checkbox"}>
                <span class="todo-text">${todoText}</span>
                <span class="todo-priority">${todoPriorityText}</span>
                <span class="todo-date">${todoDateText}</span>
                <div class="delete-btn">
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;

        todoUl.appendChild(li);
        todoInput.value = '';
        toggleEmptyState();
    };

    submitButton.addEventListener("click", addtodo);
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addtodo(e);
        }
    });

    if (e.done) {
        todoCheckbox.checked = true;
        todoTask.classList.add("line-through");
    } else {
        todoCheckbox.checked = false;
        todoTask.classList.remove("line-through");
    }

    function submitForm() {
        const todoText = todoInput.value.trim();
        const todoPriorityText = todoPriority.options[todoPriority.selectedIndex].text;
        const todoDateText = todoDate.value;

        
        toggleEmptyState();
    }

});