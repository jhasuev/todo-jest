import { compile } from "handlebars"
import FormHTMLTemplate from "./../templates/_form"
import ListHTMLTemplate from "./../templates/_list"
import ListItemHTMLTemplate from "./../templates/_list-item"

export default class Todo {
  constructor(selector) {
    this.selector = selector
  }

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

  getBaseTemplate() {
    return `
      ${FormHTMLTemplate}
      ${ListHTMLTemplate}
    `
  }
  
  addBaseTemplateToDOM(template) {
    this.appHTML.innerHTML = template
  }

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

  initTags() {
    this.inputTitle = document.querySelector('.js-field')
    this.todosListCard = document.querySelector('.js-list-card')
    this.todosList = document.querySelector('.js-list')
  }

  isAddBtn(target) {
    return target.classList.contains('js-add-btn')
  }

  isAddForm(target) {
    return target.classList.contains('js-form')
  }

  isRemoveForm(target) {
    return target.classList.contains('js-remove-btn')
  }

  isDoneCheckbox(target) {
    return target.classList.contains('js-checkbox')
  }

  onAdd() {
    const title = this.getTitleFromField().trim()
    if (title) {
      this.add(this.todos, title)
      this.clearForm()
      this.updateTodos()
    }
  }

  onRemove(btn) {
    const id = Number(btn.closest('.js-todo-item').dataset.id)
    this.remove(this.todos, id)
    this.updateTodos()
  }

  onDone(checkbox) {
    const id = Number(checkbox.closest('.js-todo-item').dataset.id)
    const done = checkbox.checked
    this.done(this.todos, id, done)
    this.updateTodos()
  }
  
  add(todos, title) {
    const todoObj = this.createTodoItem(todos, title)
    todos.unshift(todoObj)

    return todos
  }

  // test it
  remove(todos, id) {
    return this.todos = todos.filter(todo => todo.id != id)
  }

  // test it
  done(todos, id, done) {
    const todo = this.getTodoById(todos, id)
    todo.done = done

    return todo
  }

  // test it
  getTodoById(todos, id) {
    return todos.find(todo => todo.id === id)
  }

  clearForm() {
    this.inputTitle.value = ''
  }

  createTodoItem(todos, title) {
    return {
      title,
      done: false,
      id: this.getNextId(todos),
    }
  }

  updateTodos() {
    this.setAliveTodos(this.todos.length)
    this.todosList.innerHTML = this.getTodosTemplate(this.todos)
  }

  // test it
  getTodosTemplate(todos) {
    return todos.reduce((html, todo) => {
      return html + compile(ListItemHTMLTemplate)({ ...todo, done: todo.done ? 'checked' : '' })
    }, '')
  }

  setAliveTodos(state) {
    return this.todosListCard.style.display = state ? '' : 'none'
  }

  getNextId(todos) {
    return todos.reduce((acc, todo) => todo.id > acc ? todo.id : acc, 0) + 1
  }

  getTitleFromField() {
    return this.inputTitle.value
  }
}

if (process.title != 'browser') {
  module.exports = Todo
}