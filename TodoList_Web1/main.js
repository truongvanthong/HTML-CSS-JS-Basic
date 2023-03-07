const inputBox = document.querySelector(".inputField input"); // Lấy giá trị của ô input
const addBtn = document.querySelector(".inputField button"); // Lấy giá trị của nút Add
const todoList = document.querySelector(".todoList"); // Lấy giá trị của ul chứa các task
const deleteAllBtn = document.querySelector(".footer button"); // Lấy giá trị của nút Delete All
 
// Dùng để lưu trữ dữ liệu khi user nhập vào
inputBox.onkeyup = ()=>{ 
    // Lấy giá trị khi user nhập vào
    let userEnteredValue = inputBox.value;
    // Nếu user nhập vào giá trị ( không phải là khoảng trắng )
    if(userEnteredValue.trim() != 0){
        // Thì nút add của ta sẽ sáng lên
        // Trường hợp nhập toàn khoảng trắng ( space ) thì sẽ không sáng lên
        addBtn.classList.add("active");
    } else {
        // Ngược lại thì không sáng
        addBtn.classList.remove("active");
    }
}


showTasks();

// hàm để thao tác với nút Add
addBtn.onclick = ()=>{
    // Khi user nhấn vào nút Add 
    // Lấy giá trị mà user đã nhập ở ô input
    let userEnteredValue = inputBox.value;
    // Lấy localStorage ( biến lưu trữ cục bộ )
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){
        // Nếu như localStorage = null
        // Thì sẽ tạo ra 1 mảng rỗng
        listArray = [];
    } else {
        // Ngược lại thì sẽ chuyển JSON từ dạng string sang Object 
        listArray = JSON.parse(getLocalStorageData);
    }
    // Đẩy giá trị mới vào mảng đã tạo
    listArray.push(userEnteredValue);
    localStorage.setItem("New todo", JSON.stringify(listArray)); // Chuyển JSON từ dạng Object sang String
    showTasks();
    addBtn.classList.remove("active");
}

const taskList = [
  "Làm bài tập về nhà",
  "Đọc sách mới",
  "Chạy bộ hàng ngày",
  // ... thêm các công việc khác vào đây ...
];

// Hàm để hiển thị dữ liệu
function showTasks(){
    let getLocalStorageData = localStorage.getItem("New todo"); // Lấy localStorage ( biến lưu trữ cục bộ )
    if(getLocalStorageData == null){ 
        // Nếu như localStorage = null
        // Thì sẽ tạo ra 1 mảng rỗng
        listArray = [];
    } else {
        // Ngược lại thì sẽ chuyển JSON từ dạng string sang Object 
        listArray = JSON.parse(getLocalStorageData);
    }

    const pendingTasksNumb = document.querySelector(".pendingTasks"); // Lấy giá trị của span chứa số task
    pendingTasksNumb.textContent = listArray.length;  // Hiển thị số task
    if(listArray.length > 0){  // Nếu số task > 0 thì nút Delete All sẽ sáng lên
      deleteAllBtn.classList.add("active"); 
    }else{ 
      deleteAllBtn.classList.remove("active"); 
    }
    let newLiTag = ""; // Tạo 1 biến để lưu trữ dữ liệu
    listArray.forEach((element, index) => { // Dùng forEach để duyệt qua từng phần tử trong mảng
      // Thêm các thẻ li vào biến newLiTag để hiển thị ra màn hình 
      newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag;  // Thêm các thẻ li vào ul
    inputBox.value = "";  
  }

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New todo", JSON.stringify(listArray));
  showTasks();
}

deleteAllBtn.onclick = ()=>{
  listArray = []; 
  localStorage.setItem("New todo", JSON.stringify(listArray)); 
  showTasks(); 
}

// Sự kiện Enter để thêm task
inputBox.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addBtn.click();
  }
});




