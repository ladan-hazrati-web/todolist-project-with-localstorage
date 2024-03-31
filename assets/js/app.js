const inputTodoName = document.getElementById("inputTodoName");
const inputTodoDate = document.getElementById("inputTodoDate");
const addBtn = document.getElementById("addBtn");
const messageContainer = document.getElementById("messageContainer");
const message = document.getElementById("message");
const tbody = document.querySelector("tbody");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const editBtnApply = document.getElementById("editBtnApply");
const buttonsFilter = document.querySelectorAll(".btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
const showalert = (messageText, type) => {
  message.style.display = "block";
  messageContainer.classList.add(`message-${type}`);
  message.innerText = messageText;
  setTimeout(() => {
    message.style.display = "none";
    messageContainer.className = "";
  }, 2000);
};

const generateId = () => {
  const id = Math.floor(Math.random() * Math.random() * Math.pow(12, 10));
  return id;
};
const createTodo = (data) => {
    const newtodos = data || todos
  tbody.innerHTML = "";
  if (!newtodos.length) {
    tbody.innerHTML = `
        <tr>
        <td colspan='4'>No Task </td>
        </tr>
        `;
  } else {
    newtodos.forEach((todo) => {
      tbody.innerHTML += `
                <tr>
                <td>${todo.task}</td>
                <td>${todo.date || "NO Date"}</td>
                <td>${todo.status ? "completed" : "Pending"}</td>
                <td>
                  <button id="editBtn" onclick='editHandler(${
                    todo.id
                  })'>Edit</button>
                  <button id="doBtn" onclick='doHandler(${todo.id})'>${
        todo.status ? "Done" : "DO"
      }</button>
                  <button id="deleteBtn" onclick='deleteHandler(${
                    todo.id
                  })'>Delete</button>
                </td>
              </tr>
                
                
                `;
    });
  }
};

const saveToLocal = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = () => {
  const task = inputTodoName.value;
  const date = inputTodoDate.value;
  const todo = {
    id: generateId(),
    task: task,
    date: date,
    status: false,
  };
  if (task) {
    todos.push(todo);
    console.log(todos);
    createTodo();
    saveToLocal();
    showalert("Todo Added Successfully", "success");
    inputTodoDate.value = "";
    inputTodoName.value = "";
  } else {
    showalert("Enter Todo Name Please", "error");
  }
};

const deleteAllHandler = () => {
  if (!todos.length) {
    showalert("No Task Found For Delete", "error");
  } else {
    todos = [];
    createTodo();
    saveToLocal();
    showalert("Delete All Tasks Successfully", "success");
  }
};

function deleteHandler(id) {
  const newTodos = todos.filter((todo) => {
    return todo.id !== id;
  });
  todos = newTodos;
  createTodo();
  saveToLocal();
  showalert("Delete Task Successfully ", "success");
}
function doHandler(id) {
  const newTodo = todos.find((todo) => {
    return todo.id === id;
  });
  newTodo.status = !newTodo.status;
  createTodo();
  saveToLocal();
  showalert("Change Status Task", "success");
}
function editHandler(id) {
  const newTodo = todos.find((todo) => {
    return todo.id === id;
  });
  inputTodoName.value = newTodo.task;
  inputTodoDate.value = newTodo.date;
  inputTodoName.focus();
  addBtn.style.display = "none";
  editBtnApply.style.display = "inline-block";
  editBtnApply.dataset.id = id;
}
function editApplyHandler(event) {
  const id = event.target.dataset.id;
  const newTodo = todos.find((todo) => {
    return todo.id == id;
  });
  newTodo.task = inputTodoName.value;
  newTodo.date = inputTodoDate.value;
  addBtn.style.display = "inline-block";
  editBtnApply.style.display = "none";
  inputTodoName.value = "";
  inputTodoDate.value = "";
  createTodo();
  saveToLocal();
  showalert("Todo Edited Successfully", "success");
}
const filterHandler = (event) => {
  const filter = event.target.innerText;
  console.log(filter);
  const newtodos = todos.filter((todo) => {
    switch (filter) {
      case "All":
        return todo;
        break;
      case "Completed":
        return todo.status === true;
        break;
      case "Pending":
        return todo.status === false;
        break;
    }
  });
  createTodo(newtodos)
};

buttonsFilter.forEach((button) => {
  button.addEventListener("click", filterHandler);
});
window.addEventListener("load",()=> createTodo());
addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAllHandler);
editBtnApply.addEventListener("click", editApplyHandler);
