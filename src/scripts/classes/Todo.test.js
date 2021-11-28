const Todo = require('./Todo')
const TODO_SELECTOR = "#todo"
const todoItemOrigin = Object.freeze({
  id: 1,
  title: "Title 1",
  done: false,
})
const todosOrigin = Object.freeze([
  Object.freeze({
    id: 3,
    title: "Title 3",
    done: false,
  }),
  Object.freeze({
    id: 2,
    title: "Title 2",
    done: false,
  }),
  Object.freeze({
    id: 1,
    title: "Title 1",
    done: false,
  }),
])
const nextItemId = 4
const nextItemTitle = "Todo item 4"
let todo
let todos
let todoItem
let nextItem

const copy = obj => JSON.parse(JSON.stringify(obj))

const fillTodosDefaultData = () => {
  todo = new Todo(TODO_SELECTOR)
  todos = copy(todosOrigin)
  todoItem = copy(todoItemOrigin)

  nextItem = copy(todoItem)
  nextItem.title = nextItemTitle
  nextItem.id = nextItemId
}


fillTodosDefaultData()
beforeEach(() => {
  fillTodosDefaultData()
})

describe('Todo class', () => {
  test('should be defined', () => {
    expect(Todo).toBeDefined()
    expect(Todo).not.toBeUndefined()
  })

  test('should be a class', () => {
    expect(Todo).toBeInstanceOf(Function)
  })
})

describe('Todo getBaseTemplate() method', () => {
  test('should be defined', () => {
    expect(todo.getBaseTemplate()).toBeDefined()
    expect(todo.getBaseTemplate()).toBeTruthy()
  })

  test('should be a string', () => {
    expect(typeof todo.getBaseTemplate() === 'string').toBe(true)
  })

  test('should has html symbols', () => {
    expect(todo.getBaseTemplate()).toMatch(/^\s*<.*?>\s*$/img)
  })

  const containingWordsInBaseTemplate = [
    '<form ',
    '</form>',
    '<input ',
    '<button ',
    'js-form',
    'js-field',
    'js-list-card',
    'js-list',
  ]

  containingWordsInBaseTemplate.forEach(word => {
    test(`should contains word: [${word}]`, () => {
      expect(todo.getBaseTemplate()).toContain(word)
    })
  })

  test('should be currect HTML', () => {
    let domElement = document.createElement('div')
    domElement.innerHTML = todo.getBaseTemplate()

    expect(todo.getBaseTemplate()).toBe(domElement.innerHTML)
  })
})


describe('Todo "add(todos: object[], title: strig)" method', () => {
  
  test('should be defined', () => {
    expect(todo.add).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.add === 'function').toBe(true)
  })
  
  test('should return array', () => {
    expect(Array.isArray(todo.add(todos, nextItemTitle))).toBe(true)
  })
  
  test('should be array with more than 0 element ', () => {
    expect(todo.add(todos, nextItemTitle).length).toBeGreaterThan(0)
  })
  
  test('should work correctly', () => {
    const expectedResult = [nextItem, ...copy(todos)]
    const realResult = todo.add(todos, nextItemTitle)

    expect(realResult).toEqual(expectedResult)
  })
})

describe('Todo "createTodoItem(todos: object[], title: strig)" method', () => {
  test('should be defined', () => {
    expect(todo.createTodoItem).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.createTodoItem === 'function').toBe(true)
  })
  
  test('should return object', () => {
    expect(typeof todo.createTodoItem(todos, nextItemTitle) === 'object').toBe(true)
  })
  
  test('should has correct fields', () => {
    const result = todo.createTodoItem(todos, nextItemTitle)
    expect(result.id).toBeDefined()
    expect(result.title).toBeDefined()
    expect(result.done).toBeDefined()

    expect(typeof result.id === 'number').toBe(true)
    expect(typeof result.title === 'string').toBe(true)
    expect(typeof result.done === 'boolean').toBe(true)

    expect(result.id === nextItemId).toBe(true)
    expect(result.title === nextItemTitle).toBe(true)
  })
})

describe('Todo "getNextId(todos: object[])" method', () => {
  test('should be defined', () => {
    expect(todo.getNextId).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.getNextId === 'function').toBe(true)
  })
  
  test('should return number', () => {
    expect(typeof todo.getNextId(todos) === 'number').toBe(true)
  })
  
  test('should be the currect id', () => {
    const result = todo.getNextId(todos)
    expect(result).toBe(nextItemId)
  })
})

describe('Todo remove(todos, id) method: ', () => {
  test('should be defined', () => {
    expect(todo.remove).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.remove === 'function').toBe(true)
  })
  
  test('should return array', () => {
    expect(Array.isArray(todo.remove(todos, 1))).toBe(true)
  })
  
  test('should return new array with less items', () => {
    const removeItemId = 1
    const result = todo.remove(todos, removeItemId)
    expect(result.length).toBe(todos.length - 1)
    expect(result[0].id).not.toBe(removeItemId)
  })
})

describe('Todo done(todos, id, done) method: ', () => {
  test('should be defined', () => {
    expect(todo.done).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.done === 'function').toBe(true)
  })
  
  test('should return object', () => {
    expect(typeof (todo.done(todos, 1, true)) === 'object').toBe(true)
  })
  
  test('should has fields', () => {
    const result = todo.done(todos, 1, true)
    expect(result.id).toBeDefined()
    expect(result.title).toBeDefined()
    expect(result.done).toBeDefined()

    expect(Object.keys(result)).toEqual(Object.keys(todos[0]))
  })
  
  test('should change done field', () => {
    expect(todo.done(todos, 1, true).done).toBe(true)
    expect(todo.done(todos, 1, false).done).toBe(false)
  })
})

describe('Todo getTodoById(todos, id) method: ', () => {
  test('should be defined', () => {
    expect(todo.getTodoById).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.getTodoById === 'function').toBe(true)
  })
  
  test('should return object', () => {
    expect(typeof (todo.getTodoById(todos, 1, true)) === 'object').toBe(true)
  })
  
  test('should has fields', () => {
    const result = todo.getTodoById(todos, 1)
    expect(result.id).toBeDefined()
    expect(result.title).toBeDefined()
    expect(result.done).toBeDefined()

    expect(typeof result.id === 'number').toBe(true)
    expect(typeof result.title === 'string').toBe(true)
    expect(typeof result.done === 'boolean').toBe(true)
  })
  
  test('should be equal to expectation', () => {
    expect(todo.getTodoById(todos, 1)).toEqual(todos[todos.length - 1])
  })
})

describe('Todo getTodosTemplate(todos) method: ', () => {
  test('should be defined', () => {
    expect(todo.getTodosTemplate).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.getTodosTemplate === 'function').toBe(true)
  })
  
  test('should return string', () => {
    expect(typeof (todo.getTodosTemplate(todos)) === 'string').toBe(true)
  })
  

  todos.forEach(todoItem => {
    test(`should has some special words '${todoItem.title}'`, () => {
      expect(todo.getTodosTemplate(todos)).toContain(todoItem.title)
    })
  })
})

describe('Todo isAddForm(target: HTMLObject) method: ', () => {
  test('should be defined', () => {
    expect(todo.isAddForm).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.isAddForm === 'function').toBe(true)
  })
  
  test('should return true/false', () => {
    const divHtmlObject = document.createElement("div")
    expect(todo.isAddForm(divHtmlObject)).toBe(false)
    divHtmlObject.classList.add('js-form')
    expect(todo.isAddForm(divHtmlObject)).toBe(true)
  })
})

describe('Todo isRemoveForm(target: HTMLObject) method: ', () => {
  test('should be defined', () => {
    expect(todo.isRemoveForm).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.isRemoveForm === 'function').toBe(true)
  })
  
  test('should return true/false', () => {
    const divHtmlObject = document.createElement("div")
    expect(todo.isRemoveForm(divHtmlObject)).toBe(false)
    divHtmlObject.classList.add('js-remove-btn')
    expect(todo.isRemoveForm(divHtmlObject)).toBe(true)
  })
})

describe('Todo isDoneCheckbox(target: HTMLObject) method: ', () => {
  test('should be defined', () => {
    expect(todo.isDoneCheckbox).toBeDefined()
  })
  
  test('should be a function', () => {
    expect(typeof todo.isDoneCheckbox === 'function').toBe(true)
  })
  
  test('should return true/false', () => {
    const divHtmlObject = document.createElement("div")
    expect(todo.isDoneCheckbox(divHtmlObject)).toBe(false)
    divHtmlObject.classList.add('js-checkbox')
    expect(todo.isDoneCheckbox(divHtmlObject)).toBe(true)
  })
})
