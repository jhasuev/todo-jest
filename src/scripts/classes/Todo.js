import { compile } from "handlebars"
import FormHTMLTemplate from "./../templates/_form"
import ListHTMLTemplate from "./../templates/_list"
import ListItemHTMLTemplate from "./../templates/_list-item"

export default class Todo {
  constructor(selector) {
    this.selector = selector
  }

  // can't be tested
  init() {
    if (this.selector) {
      this.appHTML = document.querySelector(this.selector)
      this.todos = []

      this.addBaseTemplateToDOM(this.getBaseTemplate())
      this.initTags()
      this.updateTodos()
      this.addEvents()
    }
  }

  // tested
  getBaseTemplate() {
    return `
      ${FormHTMLTemplate}
      ${ListHTMLTemplate}
    `
  }
  
  // can't be tested
  addBaseTemplateToDOM(template) {
    this.appHTML.innerHTML = template
  }

  // can't be tested
  addEvents() {
    const onEvent = (event) => {
      const { target, type } = event

      if (type === 'submit' && this.isAddForm(target)) {
        this.onAdd()
      }

      if (type === 'click' && this.isRemoveForm(target)) {
        this.onRemove(target)
      }

      if (type === 'change' && this.isDoneCheckbox(target)) {
        this.onDone(target)
      }
    }

    this.appHTML.addEventListener('click', onEvent)
    this.appHTML.addEventListener('submit', event => {
      event.preventDefault()
      onEvent(event)
    })
    this.appHTML.addEventListener('change', onEvent)
  }

  // can't be tested
  initTags() {
    this.inputTitle = document.querySelector('.js-field')
    this.todosListCard = document.querySelector('.js-list-card')
    this.todosList = document.querySelector('.js-list')
  }

  // tested
  isAddForm(target) {
    return target.classList.contains('js-form')
  }

  // tested
  isRemoveForm(target) {
    return target.classList.contains('js-remove-btn')
  }

  // tested
  isDoneCheckbox(target) {
    return target.classList.contains('js-checkbox')
  }

  // can't be tested
  onAdd() {
    const title = this.getTitleFromField().trim()
    if (title) {
      this.add(this.todos, title)
      this.clearForm()
      this.updateTodos()
    }
  }

  // can't be tested
  onRemove(btn) {
    const id = Number(btn.closest('.js-todo-item').dataset.id)
    this.remove(this.todos, id)
    this.updateTodos()
  }

  // can't be tested
  onDone(checkbox) {
    const id = Number(checkbox.closest('.js-todo-item').dataset.id)
    const done = checkbox.checked
    this.done(this.todos, id, done)
    this.updateTodos()
  }
  
  // tested
  add(todos, title) {
    const todoObj = this.createTodoItem(todos, title)
    todos.unshift(todoObj)

    return todos
  }

  // tested
  remove(todos, id) {
    return this.todos = todos.filter(todo => todo.id != id)
  }

  // tested
  done(todos, id, done) {
    const todo = this.getTodoById(todos, id)
    todo.done = done

    return todo
  }

  // tested
  getTodoById(todos, id) {
    return todos.find(todo => todo.id === id)
  }

  // can't be tested
  clearForm() {
    this.inputTitle.value = ''
  }

  // tested
  createTodoItem(todos, title) {
    return {
      title,
      done: false,
      id: this.getNextId(todos),
    }
  }

  // can't be tested
  updateTodos() {
    this.setAliveTodos(this.todos.length)
    this.todosList.innerHTML = this.getTodosTemplate(this.todos)
  }

  // tested
  getTodosTemplate(todos) {
    return todos.reduce((html, todo) => {
      return html + compile(ListItemHTMLTemplate)({ ...todo, done: todo.done ? 'checked' : '' })
    }, '')
  }

  // can't be tested
  setAliveTodos(state) {
    return this.todosListCard.style.display = state ? '' : 'none'
  }

  // tested
  getNextId(todos) {
    return todos.reduce((acc, todo) => todo.id > acc ? todo.id : acc, 0) + 1
  }

  // can't be tested
  getTitleFromField() {
    return this.inputTitle.value
  }
}

if (process.title != 'browser') {
  module.exports = Todo
}