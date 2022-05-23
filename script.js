const todoForm = document.querySelector("#todo-form");
const value = document.querySelector("#value");
const addbtn = document.querySelector("#addbtn");
const todoIteCard = document.querySelector("#todo-item-card");
const data = JSON.parse(localStorage.getItem("todoData")) || [];

let todoItemId = 0;

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (value.value.length > 0) {
    if (addbtn.value === "Add") {
      data.unshift({ id: new Date().getTime(), todo: value.value });
      localStorage.setItem("todoData", JSON.stringify(data));
      value.value = "";
    } else {
      console.log(typeof todoItemId);
      data.map((item, index) => {
        if (todoItemId === item.id) {
          data.splice(index, 1, { ...item, todo: value.value });
          localStorage.setItem("todoData", JSON.stringify(data));
          value.value = "";
          addbtn.value = "Add";
        }
      });
    }
    todoIteCard.innerHTML = MyTodoItem(data).join("");
  } else {
    alert("Please fill the form");
  }
});

// ============= EditItem =============

function EditItem(id, name) {
  todoItemId = id;
  value.value = name;
  addbtn.value = "Update";
}

// =========== DeleteItem =============

function DeleteItem(id) {
  data.map((item, index) => {
    if (item.id === id) {
      data.splice(index, 1);
      localStorage.setItem("todoData", JSON.stringify(data));
    }
  });

  todoIteCard.innerHTML = MyTodoItem(data).join("");
}

// =============== Function MyTodoItem ===========

function MyTodoItem(param) {
  return param.map((item, index) => {
    return `
        <div id="todo-item">
          <p>${item.todo}</p>
          <div>
            <button onclick="EditItem(${item.id}, '${item.todo}')">Edite</button>
            <button onclick="DeleteItem(${item.id})">Delete</button>
          </div>
        </div>
        `;
  });
}

todoIteCard.innerHTML = MyTodoItem(data).join("");
