/* Planning Projects tasks
    Users interaction
I. Add items
   - a) User will type in todo and click Add Todo button. This should
    then add item to the list
    1. Add
    2. Save
    3. Load
    Working with data
II. Mark complete items as done
III. Delete items
*/

const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#list")
const template = document.querySelector("#list-item-template")
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST" // I. 2. 1.
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos` // I. 2. 2.
/* I. 3. 2. const todos = [] // reset [] to the function loadTodos() */
let todos = loadTodos() // !!!!!! redefine

/* I. 3. 4. Rendering list items permanently */
todos.forEach(renderTodos) // (todo => renderTodos(todo))
// const listItem = document.querySelector(".list-item")
/* Comment II. 2. */
// ???? list
todoList.addEventListener("change", (e) => {
  console.log(e.target.checked)
  if (!e.target.matches("[data-list-item-checkbox]")) return
  const parent = e.target.closest(".list-item") // II.3.1.E.a
  const todoId = parent.dataset.todoId // II.3.1.E.b
  const individualId = todos.find((t) => t.id === todoId) // II.3.1.E.b
  individualId.complete = e.target.checked

  /* II. 3. 
1.  Get the "todo" that is checked
  A) To distinguish 2 identical items ("ABC" / "ABC") we need to add
    to "newTodoName" another one property: ID.
    We use new Date().valueOf().toString() object
  B) Now we need to get the ID of "todo". The easiest way is to set
    the ID into the list-item in the HTML template. We want to be able
    not only get the text of "todo", but its ID. We have our template
    in the renderTodos() function. So we go there an create a new
    variable "listItem" and querySelector() it by class name.
  C) Set to the each new "listItem" ("todo") new attribute: "todoId"
    just like we add to the object new property, but like this:

    listItem.dataset.todoId = todo.id, which means:
      - listItem: name of the new variable of list-item
      - dataset: set of attributes of element
      - todoId: name we gave to the new property = to
      - todo.id: todo - function parameter (newTodName as argument)
      - id: object property of "newTodoName" object
  E) Now we need to get the "todo" we clicked on. Take an ID from
    each "todo" item.
    a) For this we define a parent of our input:
    const parent = e.target.closest(".list-item") which is:
      - parent is "list-item" <li>, DOM Traversal lesson
    b) Define new const for individual ID
      - const todoId = parent.dataset.id
    c) And now we just get the individual "todo" by ID we want:
    const individualId = todos.find((t) => t === todoId)
    d) Set "individualId" to completed:
      - individualId.complete = e.target.checked ==>> true || false
      method. find() returned new varaible from the "todos" 
    (our items from the item list). Thats why "complete" property is
    accessible now.

2. Toggle the complete prop to be equal to checked prop of checkbox
3. Store them to the localStorage as completed */
  saveTodos()
})

/* III. Delete */ // !!!??????????????????? todoList vs list
todoList.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return

  const parent = e.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  // Remove the todo from the screen
  parent.remove()
  // Remove the todo from the list
  todos = todos.filter((todo) => todo.id !== todoId)
  // Save the new todos
  saveTodos()
})

/* I. */
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const todoName = todoInput.value
  if (todoName === "") return
  const newTodoName = {
    name: todoName,
    complete: false,
    // id: Symbol().valueOf().toString(),
    id: new Date().valueOf().toString(), // II. 3. 1.
  }
  todos.push(newTodoName)
  renderTodos(newTodoName)
  saveTodos()
  todoInput.value = ""
})

/* I. 1. Adding items */
function renderTodos(todo) {
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector(".list-item") // II.3.1.B)
  listItem.dataset.todoId = todo.id // II.3.1.C)
  const listItemText = templateClone.querySelector("[data-list-item-text]")
  listItemText.innerText = todo.name
  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
  checkbox.checked = todo.complete
  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  todoList.appendChild(templateClone)
}

/* I. 3. 1. Loading Todos
If we loading this page first time and don't have any item it "todos" it's going to return "undefined". We need convert this string into JS object or an array. JSON.parse(). Because we converted "todos" into a JSON string in the function saveTodos(). 

    I. 3. 3. Shortcircuiting "return" if "todos" have no item to avoid an error
when loading the page
*/

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
  return JSON.parse(todosString) || [] // convert to array
}

/* I. 2. Saving items
    A. For now our Todos are saving in HTML. But we want to saving them
in JS. So we're gonna create a variable of Todos on the top of script.

    B). Localstorage requieres a KEY: VALUE. For this purpose we need to
create a global variable on the top of the script, something thatrelates to application ADVANCED_TODO_LIST.

    Localstorage is site dependent. It means when you working on
the local host all the sites share the same local storage. And that can lead to wierd bugs.
    It's two step operation:
    I. 2. 1. Create a LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST-"
    I. 2. 2. Create a TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`

    Storing data requires 2 parameters: KEY and VALUE. As value we pass
const "todos", converted to array of strings JSON.stringify()
We want to store it as an array sintax. Even though it's stored as a
string, it is stored as a syntax of an array
*/

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

/* II. 1. Now we have rendered, saved and loaded items. But we don't
have saved a status - checked / unchecked. We need to store
a "todoName" with two criterias: name / status (checked || not).
The best way to do this restore this variable to NEW object.
Instead of pushing into array "todos" a value, we will push an
object with 2 prop: { name: todoName, complete: false}. It calls
"REFACTORING CODE"

  II. 2. If we addEventListener on all checkboxes it will not work
because after we add a new item to the "todos" it will not see them.
EVENT DELEGATION lesson. We need to addEventListener to all document,
but we don't wanna do this. We add it to the list item.
e.target.matches("data-list-item-checkbox") - method
"CHANGE" - EVENT => true / false
console.log(e) - to see the property of event (checked, value...)

  II. 3.
 */

//
//
//
//
//
//
//
//
//
//
//
//
//
//
// const aa = {
// id: Symbol(),
// name: "Name",
// }
//
// const bb = {
// id: Symbol(),
// name: "Name1",
// }
//
// console.log(aa.id === bb.id)
