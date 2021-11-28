export default `
  <div class="todo-list__group-item  todo-item  js-todo-item" data-id="{{ id }}">
    <label class="todo-item__checkbox  checkbox">
      <input type="checkbox" name="done" class="checkbox__field  js-checkbox" {{ done  }}>
      <i class="checkbox__icon"></i>
    </label>
    <div class="todo-item__title  js-title">{{ title }}</div>
    <button class="todo-item__remove-btn  btn  btn--red  js-remove-btn" title="Remove item">Remove</button>
  </div>
`