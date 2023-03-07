const addForm = document.querySelector(".add"); // gán biến addForm = thẻ có class là add
const list = document.querySelector(".todos"); // gán biến list = thẻ có class là todos
const search = document.querySelector(".search input"); // gán biến search = thẻ có class là search

// Tạo template cho mỗi todo item và thêm vào list item (list)
const generateTemplate = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `; // tạo template cho mỗi todo item

  list.innerHTML += html; // thêm html vào list
};

// Thêm todo item vào list
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();

  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// Delete Todos 
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// Filter Todos cho phép tìm kiếm các todo item trong list
const filterTodos = (term) => { // term là từ khóa cần tìm
  Array.from(list.children) // chuyển list thành mảng
    .filter((todo) => !todo.textContent.toLowerCase().includes(term)) // lọc ra những phần tử không chứa term
    .forEach((todo) => todo.classList.add("filtered")); // thêm class filtered vào những phần tử không chứa term

  Array.from(list.children) // chuyển list thành mảng
    .filter((todo) => todo.textContent.toLowerCase().includes(term)) // lọc ra những phần tử chứa term
    .forEach((todo) => todo.classList.remove("filtered")); // xóa class filtered khỏi những phần tử chứa term
};

//Keyup event
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
