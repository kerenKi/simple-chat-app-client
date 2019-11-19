import React from 'react';
import './App.css';
import request from 'superagent';
import io from "socket.io-client";

class App extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      user_name: '',
      messages: [],
      text: '',
      user_logged: false
    }

    this.socket = io('localhost:4000')

    this.socket.on('newMessage', function(message){
        addMessage(message);
    })

    const addMessage = (message) => {
        this.setState({
          messages: [...this.state.messages, message]
        })
    }

    this.onChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    this.onSubmitName = (event) => {
      event.preventDefault()
      this.setState({
        user_logged: true
      })
    }

    this.onSendMessage = (event) => {
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

      this.setState({
        text: ''
      })
    }
  }
  render(){
    return (
      <div className="App">
        <h1>Welcome to the best chat app ever</h1>
        { this.state.user_logged && <h1>Hello {this.state.user_name}</h1> }
        { !this.state.user_logged && 
          <div>
            <h2>What should we call you?</h2>
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
