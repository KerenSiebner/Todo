
function onInit() {
    renderTodos()
}

function renderTodos() {

    const todos = getTodosForDisplay()

    const strHTMLs = todos.map(todo => `
    <li class="${(todo.isDone) ? "done" : ""}"
         onclick="onToggleTodo('${todo.id}')">
         ${todo.txt} &nbsp&nbsp Importance:&nbsp ${todo.importance}
        <button onclick="onRemoveTodo(event,'${todo.id}')">x</button> 
    </li>` )
    // &nbsp&nbsp Created: &nbsp ${todo.time}&nbsp&nbsp&nbsp - want to convert to time for display

    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    const totalTodos = getTotalTodos()
    const activeTodos = getActiveTodos()
    document.querySelector('.total-todos').innerText = totalTodos? totalTodos : 'No active todos'
    document.querySelector('.active-todos').innerText = activeTodos ? activeTodos : 'No active todos'
}

function onAddTodo(ev) {
    ev.preventDefault()
    // const createdAt = new Date().toLocaleDateString("de-DE")
    const createdAt = new Date().getTime()
    const elTxt = document.querySelector('input[name="todo-txt"]')
    const txt = elTxt.value
    const elImprt = document.querySelector('select[name="todo-imprt"]')
    const imprt = elImprt.value
    if (!txt || imprt > 3 || imprt < 1) return
    addTodo(txt, imprt, createdAt)
    elTxt.value = ''
    elImprt.value = ''
    renderTodos()
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    if (!window.confirm('Do you really want to delete item?')) return
    // console.log('Removing', todoId)
    removeTodo(todoId)
    renderTodos()
    //when delete is clicked, use confirm() 
    //and only if user approves - delete the todo
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onSetFilter(filterBy) {
    // console.log('filterBy', filterBy)
    setFilter(filterBy)
    renderTodos()
}

function onSetSort(sortBy) {
    // console.log('filterBy', filterBy)
    setSort(sortBy)
    renderTodos()
}


