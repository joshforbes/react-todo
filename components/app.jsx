var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  getInitialState() {
    return {
      todos: []
    }
  },
  addTodo(todo) {
    this.setState({ todos: this.state.todos.concat([todo]) });
  },
  removeTodo(index) {
    this.state.todos.splice(index, 1);
    this.setState({ todos: this.state.todos});
  },
  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <TodoList removeTodo={this.removeTodo} todos={this.state.todos} />
        <TodoForm addTodo={this.addTodo} />
      </div>
    )
  }
});

var TodoList = React.createClass({
  renderTodo(value, index) {
    return (
      <Todo removeTodo={this.props.removeTodo} key={index} todo={value} index={index} />
    )
  },
  render() {
    var todos = this.props.todos.map(this.renderTodo);
    return (
      <ul>
        {todos}
      </ul>
    )
  }
});

var Todo = React.createClass({
  deleteTodo(event) {
    event.preventDefault();
    this.props.removeTodo(this.props.index);
  },
  render() {
    return (
      <li>
        <a onClick={this.deleteTodo}>{this.props.todo}</a>
      </li>
    )
  }
});

var TodoForm = React.createClass({
  createTodo(event) {
    event.preventDefault();
    var todo = this.refs.todo.value;
    this.props.addTodo(todo);
    this.refs.todoForm.reset();
  },
  render() {
    return (
    <form ref="todoForm" onSubmit={this.createTodo}>
      <h3>Add a Todo</h3>
      <input type="text" ref="todo"/>
      <input type="submit" />
    </form>
    )
  }  
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);