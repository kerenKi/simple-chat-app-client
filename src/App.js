import React from 'react';
import './App.css';
import request from 'superagent';
import { connectionToServer } from './api'

class App extends React.Component {
  state = {
    user_name: '',
    messages: [
      {
        user_name:'keren',
        text:'Hi'
      },
      {
        user_name:'yossi',
        text:'Hi to you too'
      },
      {
        user_name:'yossi',
        text:'how are you?'
      }
    ],
    text: '',
    user_logged: false
  }

  onChange = (event) => {
    console.log(event.target.name)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  onSubmitName = (event) => {
    event.preventDefault()
    connectionToServer()
    this.setState({
      user_logged: true
    })
    console.log(this.state.user_name)
  }

  onSendMessage = (event) => {
    event.preventDefault()
    const message = {
      user_name: this.state.user_name,
      text: this.state.text
    }

    request.post('http://localhost:4000/messages')
    .send({
      message: message
    })
    .then(res => console.log(res))
    .catch(console.error)

    //TODO: don't add to state, let it come from the server
    this.setState({
      messages: [...this.state.messages, message]
    })
    console.log(this.state.text)
    this.setState({
      text: ''
    })
  }

  render(){
    return (
      <div className="App">
        <h1>Welcome to the best chat app ever</h1>
        { this.state.user_logged && <h1>Hello {this.state.user_name}</h1> }
        { !this.state.user_logged && 
          <div>
            <h2>How should we call you?</h2>
            <form onSubmit={this.onSubmitName}>
              <label>Pick a nickname to join the chat room</label>
              <input type="text" name="user_name" onChange={this.onChange} required/>

              <input type="submit" /> 
            </form>
          </div> }

          <form onSubmit={this.onSendMessage}>
            <label> Post a new message </label>
            <input type="text" name="text" value={this.state.text} onChange={this.onChange} required/>

            <input type="submit" /> 
          </form>

          <ul>
            {this.state.messages && this.state.messages.map((message, index) => <li key={index}>
              {message.user_name}: {message.text}
            </li>)}
          </ul>
      </div>
    )
  }
}

export default App;
