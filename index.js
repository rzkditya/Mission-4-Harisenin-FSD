document.addEventListener("DOMContentLoaded", () => {

    const profileName = document.querySelector(".username");
    const profilePosition = document.querySelector(".user-position");
    profileName.innerHTML = "Rizky Aditya";
    profilePosition.innerHTML = "Web Developer";

    

    window.onload = () => {
        let todos = getTodos();
        console.log(todos);
        
        setInterval(() => {
            const menuDate = document.querySelector("#date");
            const menuTime = document.querySelector("#time");
            const date = new Date();
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
            
            menuDate.innerText = date.toLocaleDateString("id-ID", options);
            menuTime.innerText = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }, 1000);

        const todoInput = document.querySelector("#todo-input");
        const todoPriority = document.querySelector("#todo-priority");
        const todoDate = document.querySelector("#todo-date");

        const submitButton = document.querySelector("#submit-btn");
        const resetButton = document.querySelector("#reset-btn");

        const todoSection = document.querySelector("#todo-content");
        const doneSection = document.querySelector("#done-content");

        function todoElementMaker(e) {
            const todoContainer = document.createElement("div");
            todoContainer.classList.add("todo-item");
            todoContainer.dataset.id = e.id;

            const todoElement = document.createElement("div");
            todoElement.classList.add("todo-element");

            const todoCheckbox = document.createElement("input");
            todoCheckbox.type = "checkbox";
            todoCheckbox.classList.add("checkbox");
            todoCheckbox.setAttribute("role", "todo-checkbox");
            todoCheckbox.dataset.id = e.id;

            const todoText = document.createElement("span");
            todoText.classList.add("todo-text");
            todoText.innerText = e.task;
            
            const todoPriority = document.createElement("span");
            const todoPriorityColor = {
                "high": "high-prior",
                "medium": "med-prior",
                "low": "low-prior",
            };
            const priorityClass = todoPriorityColor[e.priority];
            todoPriority.classList.add("priority-box", priorityClass);

            const todoDateSp = document.createElement("span");
            todoDateSp.classList.add("todo-date");
            todoDateSp.innerText = e.date;

            const todoDelete = document.createElement("button");
            todoDelete.dataset.id = e.id;
            todoDelete.classList.add("delete-btn");
            todoDelete.innerHTML = `<i class="fa-solid fa-trash" role="todo-delete" data-id="${e.id}"></i>`;

            if (e.done) {
                todoCheckbox.checked = true;
                todoText.style.color = "rgba(255, 255, 255, 0.5)";
                todoText.style.textDecoration = "line-through";
            } else {
                todoCheckbox.checked = false;  
                todoText.style.textDecoration = "none";
            }

            todoElement.appendChild(todoCheckbox);
            todoElement.appendChild(todoText);
            todoElement.appendChild(todoPriority);
            todoElement.appendChild(todoDateSp);
            todoContainer.appendChild(todoElement);
            todoContainer.appendChild(todoDelete);

            return todoContainer;
        }
        

        function renderTodo() {
            todoSection.innerHTML = "";
            doneSection.innerHTML = "";

            const sorted = [...todos].sort((a, b) => new Date(a.rDate) - new Date(b.rDate));

            sorted.forEach((e) => {
                if(!e.done) {
                    todoSection.appendChild(todoElementMaker(e));
                }
            });

            sorted.forEach((e) => {
                if(e.done) {
                    doneSection.appendChild(todoElementMaker(e));
                }
            });


            saveTodos();
        }

        renderTodo();

        function submitForm() {
            const inputDate = todoDate.value;
            const dateValue = inputDate ? new Date(inputDate) : new Date();
            const formattedDate = dateValue.getDate() + "/" + (dateValue.getMonth() + 1) + "/" + dateValue.getFullYear();
            const formattedRDate = dateValue.getFullYear() + "-" + (dateValue.getMonth() + 1) + "-" + dateValue.getDate();


            todos.push({
                id: todos.length ? todos[todos.length - 1]["id"]  + 1 : 0,
                task: todoInput.value,
                priority: todoPriority.value || "low",
                date: formattedDate,
                rDate: todoDate.value || formattedRDate,
                done: false,
            });

            saveTodos();
            renderTodo();
        }

        function resetForm() {
            todoInput.value = "";
            todoPriority.selectedIndex = 0;
            todoDate.value = "";
        }

        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            if (todoInput.value === "") {
                alert("Please fill in the task");
                return;
            }
            console.log("Submitting form...");
            submitForm();
            resetForm();
        });

        resetButton.addEventListener("click", (e) => {
            resetForm();
        });

        function removeTodo(id) {
            todos = todos.filter((e) => (e.id === Number(id) ? false : true));
            console.log(id);
        }

        function tickTodo(id, isDone) {
            todos = todos.map((e) => (e.id === Number(id) ? { ...e, done: isDone } : e));
            console.log(id);
        }

        const todoTab = document.querySelector(".todo-list");
        const doneTab = document.querySelector(".done-list");

        todoTab.addEventListener("click", (e) => {
            tabChange(e);
        });

        doneTab.addEventListener("click", (e) => {
            tabChange(e);
        });

        function tabChange(e) {
            const tab = e.target.dataset.tab;

            if (tab === "todo") {
                todoSection.style.display = "block";
                todoTab.classList.add("activate");
                doneSection.style.display = "none";
                doneTab.classList.remove("activate");
            } else if (tab === "done") {
                todoSection.style.display = "none";
                todoTab.classList.remove("activate");
                doneSection.style.display = "block";
                doneTab.classList.add("activate");
            }
        }

        document.querySelector("#clear").onclick = () => {
            todos = [];
            renderTodo();
        };

        document.querySelector(".flex-3").onclick = (e) => {
            if (e.target.hasAttribute("role")) {
            const roleAction = e.target.getAttribute("role");

            if (roleAction === "todo-checkbox") {
                tickTodo(e.target.dataset.id, e.target.checked);
            } else if (roleAction === "todo-delete") {
                removeTodo(e.target.dataset.id);
            }
            renderTodo();
            }
        };

        function saveTodos() {
            const todosJson = JSON.stringify(todos);
            localStorage.setItem("todos", todosJson);
        }

        function getTodos() {
            const todo = localStorage.getItem("todos") || "[]";
            return JSON.parse(todo);
        }

    }
});