const input = document.querySelector(".input");
const submit = document.querySelector(".submit");
const todoList = document.querySelector(".todoList");



submit.addEventListener("click", (event) => {
    event.preventDefault();
    addTodo();
    input.value = "";
    showTodos()

})

function addTodo() {
    const inputValue = input.value;
    console.log(inputValue);
    if (inputValue == "") {
        alert("Please enter your todo.")
    } else {
        let todoArray = JSON.parse(localStorage.getItem("todoArray")) || []
        todoArray.push({
            value: inputValue,
            id: Date.now()
        })

        localStorage.setItem("todoArray", JSON.stringify(todoArray))
    }
}

function showTodos() {
    let todoArray = JSON.parse(localStorage.getItem("todoArray"))
    let abc = todoArray.map((todo) => {
        return `<div id="main_${todo.id}" class="todo" key="todo_${todo.id}">
            <h3>${todo.value}</h3>
            <div class="btn-grp">
                <i class="editTodo fa-solid fa-pen-to-square"  id="${todo.id}"></i>
                <i class="deleteTodo fa-solid fa-trash"" id="${todo.id}"></i>
            </div>
        </div>`
    })

    todoList.innerHTML = abc.join("");

    const editTodo = document.querySelectorAll(".editTodo")
    const deleteTodo = document.querySelectorAll(".deleteTodo")
    const todo = document.querySelectorAll(".todo")
    const h3 = document.querySelectorAll("h3")


    // Completed Mark
    h3.forEach((hThree)=>{
        hThree.addEventListener("click", function completed(){
            todo.forEach((todoOne)=>{
                if(hThree.parentElement.id === todoOne.id){
                        todoOne.classList.toggle("completed")
                    }
            })
        })
    })



    // Delete functionality 
    deleteTodo.forEach((todoDiv) => {
        todoDiv.addEventListener("click", (e) => {
            todoArray = todoArray.filter(todo => parseInt(todo.id) !== parseInt(e.target.id))
            localStorage.setItem("todoArray", JSON.stringify(todoArray))
            showTodos()
        })
    })


    // Edit functionality
    editTodo.forEach((todoDiv) => {
        todoDiv.addEventListener("click", (e) => {
            let edited = prompt()
            if (edited) {

                todoArray.map((todo) => {
                    if (parseInt(todo.id) == parseInt(e.target.id)) {
                        todo.value = edited
                    }
                })
            } else {
                return
            }
            localStorage.setItem("todoArray", JSON.stringify(todoArray))

            showTodos()

        })
    })

}

showTodos()


 // <button class="editTodo"  id="${todo.id}"><i class="fa-solid fa-pen-to-square"></i></button>