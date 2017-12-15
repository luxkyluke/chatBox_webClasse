import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Formulaire from './Formulaire';
import Message from './Message';
import base from '../base';
import '../animation.css';


class App extends React.Component {

  state = {
    messages: {}
  }

  componentWillMount(){
    this.ref = base.syncState('/', {
      context : this,
      state : 'messages'
    });
  }

  componentWillUpdate(){
      this.messages.scrollTop = this.messages.scrollHeight;
  }

  addMessage = (message) => {
    const messages = {...this.state.messages}
    const timestamp = Date.now();
    messages[`message-${timestamp}`] = message;
    Object
      .keys(messages)
      .slice(0, -10)
      .map(key => messages[key] = null)
    this.setState({ messages });
  }

  isUser = (pseudo) => {
    return pseudo === this.props.params.pseudo
  }

  render() {
    const messages = Object.keys(this.state.messages).map(key => <Message key={key} details={this.state.messages[key]} isUser={this.isUser} />)

    return (
      <div className="box">
        <div>
          <div className="messages" ref={input => this.messages = input}>
            <ReactCSSTransitionGroup
              component="div"
              className="message"
              transitionName="message"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={1000}
            >  
              {messages}
            </ReactCSSTransitionGroup>
          </div>
          <Formulaire addMessage={this.addMessage} pseudo={this.props.params.pseudo} length={140}/>
        </div>
      </div>
    )
  }
}

export default App;