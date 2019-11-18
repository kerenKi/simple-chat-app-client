import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    user_name: '',
    messages: [],
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
    this.setState({
      user_logged: true
    })
    console.log(this.state.user_name)
  }

  onSendMessage = (event) => {
    event.preventDefault()
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
              <label>Pick a nickname</label>
              <input type="text" name="user_name" onChange={this.onChange} required/>

              <input type="submit" /> 
            </form>
          </div> }

          <form onSubmit={this.onSendMessage}>
            <label> Post a new message </label>
            <input type="text" name="text" value={this.state.text} onChange={this.onChange} required/>

            <input type="submit" /> 
          </form>

      </div>
    )
  }
}

export default App;
