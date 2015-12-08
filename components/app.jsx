var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  getInitialState: function() {
    return {
      todos: []
    }
  },
  addTodo: function(todo) {
    this.setState({ todos: this.state.todos.concat([todo]) });
  },
  removeTodo: function(todo) {
    var filteredTodos = this.state.todos.filter(item => item !== todo);
    this.setState({ todos: filteredTodos});
  },
  render: function() {
    return (
      <div>
        <h1>Todo List</h1>
        <TodoList removeTodo={this.removeTodo} todos={this.state.todos}/>
        <TodoForm addTodo={this.addTodo} />
      </div>
    )
  }
});

var TodoList = React.createClass({
  renderTodo: function(value, index) {
    return <Todo removeTodo={this.props.removeTodo} key={index} todo={value} />
  },
  render: function() {
    var todos = this.props.todos.map(this.renderTodo);
    return (
      <ul>
        {todos}
      </ul>
    )
  }
});

var Todo = React.createClass({
  deleteTodo: function(event) {
    event.preventDefault();
    this.props.removeTodo(this.props.todo);
  },
  render: function() {
    return (
      <li><a onClick={this.deleteTodo}>{this.props.todo}</a></li>
    )
  }
});

var TodoForm = React.createClass({
  createTodo: function(event) {
    event.preventDefault();
    var todo = this.refs.todo.value;
    this.props.addTodo(todo);
    this.refs.todoForm.reset();
  },
  render: function() {
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