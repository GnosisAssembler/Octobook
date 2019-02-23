import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

const URL = 'ws://localhost:5000'

class Chat extends Component {
    state = {
        name: '',
        messages: [],
    }

    ws = new WebSocket(URL)

    componentDidMount() {
        // Get the current profile from the redux state
        this.props.getCurrentProfile();

        this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        }

        this.ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages
        const message = JSON.parse(evt.data)
        this.addMessage(message)
        }

        this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss
        this.setState({
            ws: new WebSocket(URL),
        })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
            this.props.history.push('/not-found');
        }
    }

    addMessage = message =>
        this.setState(state => ({ messages: [message, ...state.messages] }))

    submitMessage = messageString => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { name: this.state.name, message: messageString }
        this.ws.send(JSON.stringify(message))
        this.addMessage(message)
    }

    render() {

        const { profile, loading } = this.props.profile;
        let chatContent;

        if (profile === null || loading) {
            chatContent = <Spinner />;
        } else {
            chatContent = (
                <div className="chat">
                    <h2>Public Chatroom</h2>
                    <input
                        type="text"
                        id={'name'}
                        placeholder={'Enter your name...'}
                        value={this.state.name}
                        onChange={e => this.setState({ name: profile.user.name })}
                    />
                    <ChatInput
                        ws={this.ws}
                        onSubmitMessage={messageString => this.submitMessage(messageString)}
                    />
                    {this.state.messages.map((message, index) =>
                    <ChatMessage
                        key={index}
                        message={message.message}
                        name={message.name}
                    />,
                    )}
                </div>
            );
        }
    
        return (
        <div>
            {chatContent}
        </div>
        )
    }
}

Chat.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile })(Chat);