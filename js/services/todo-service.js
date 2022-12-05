const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy = 'Text'

_createTodos()

function getTodosForDisplay() {
    console.log('gSortBy', gSortBy)
    if (gSortBy === 'txt') gTodos.sort((a, b) => a.txt - b.txt)  //this doesn't work
    else if (gSortBy === 'time') gTodos.sort((a, b) => b.time - a.time)
    else if (gSortBy === 'importance') gTodos.sort((a, b) => b.importance - a.importance)
    
    if (gFilterBy === 'all') return gTodos

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
}

function addTodo(txt, imprt, time) {
    const todo = _createTodo(txt, imprt, time)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}
function setSort(sortBy) {
    gSortBy = sortBy
}

function getTotalTodos() {
    return gTodos.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}


function _createTodo(txt, imprt, time) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        time,
        importance: imprt
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}