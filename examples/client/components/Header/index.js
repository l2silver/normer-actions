
import React, { Component } from 'react'
import uuid from 'uuid/v1'
import TodoTextInput from '../TodoTextInput'

class Header extends Component {
  handleSave(text) {
    if (text.length) {
      this.props.addTodo({text, id: uuid()})
    }
  }

  render() {
    return (
      <header>
        <h1>Todos</h1>
        <TodoTextInput
          newTodo
          onSave={::this.handleSave}
          placeholder="What needs to be done?" />
      </header>
    )
  }
}

export default Header
