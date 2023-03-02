// Tüm elementleri seçme
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
let todos=[];

runEvents();
function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodos);
    filterInput.addEventListener("keyup",filter);
}


// Sayfa açılırken Storage üzerinden daha önceki verileri çekme
function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

//Filtreleme
function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display : block");
            }else{
                todo.setAttribute("style","display : none !important");
            }
        })
    }else{
        showAlert("warning","Filtreleme yapmak için en az bir todo olmalıdır.");
    }
}

// Tüm Todoları Tek seferde silme
function allTodos(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length>0){
        // Ekrandan Silme
        todoListesi.forEach(function(todo){
            todo.remove();
        });


        //Storage Silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Başarılı bir şekilde silindi");
    }else{
        showAlert("warning","Silmek için en az bir to-do olmalıdır.");
    }
}


// Eklenen veriyi çarpıya basarak silme
function removeTodoToUI(e){
    if(e.target.className==="fa fa-remove"){
        //Ekrandan Silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //Storage Silme
        removeTodoToStorage(todo.textContent);
        showAlert("success","Todo başarıyla silindi.");
    }
}


function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }

    });
    localStorage.setItem("todos",JSON.stringify(todos));
}


function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen boş bırakmayınız!");
    }else {
    // Arayüze Ekleme
    addTodoToUI(inputText);
     // Storage Ekleme
     addTodoToStorage(inputText);
     showAlert("success","Todo Eklendi.");
    }
     // Submit ettikten sonra sayfanın yenilenmesini engelleme
   e.preventDefault();
}


// Arayüze Ekleme Fonksiyonu
function addTodoToUI(newtodo){
    /* Örnek Li
    <li class="list-group-item d-flex justify-content-between">Todo 1
    <a href="#" class="delete-item">
        <i class="fa fa-remove"></i>
    </a>
</li> */
const li = document.createElement("li");
li.className="list-group-item d-flex justify-content-between";
li.textContent= newtodo;

const a = document.createElement("a");
a.href="#";
a.className="delete-item";

const i = document.createElement("i");
i.className="fa fa-remove";

a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);
addInput.value = "";
}


// Local Storage Ekleme Fonksiyonu
function addTodoToStorage(newtodo){
  checkTodosFromStorage();
  todos.push(newtodo);
  localStorage.setItem("todos",JSON.stringify(todos));
}


// Local storage kontrolü
function checkTodosFromStorage () {
    if(localStorage.getItem("todos")===null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}


// UYARI MESAJI ÇIKARMA
function showAlert (type,message){
/*<div class="alert alert-warning" role="alert">
 This is a warning alert—check it out!</div> */

 const div = document.createElement("div");
 div.className="alert alert-"+type;
 div.textContent= message;

firstCardBody.appendChild(div);
setTimeout(function(){
    div.remove();
}, 1500);
}