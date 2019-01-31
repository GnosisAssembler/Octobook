import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// Import connect for connecting redux to this component
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor () {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }

        // Bind events
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    // Create onChange form event
    onChange(e) {
        this.setState( { [e.target.name]: e.target.value } );
    }

    // Create onSubmit form event
    onSubmit(e) {
        // prevent default form submit behaviour
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState( { errors: nextProps.errors} );
        }
    }

    render() {
        // Get errors from the state, in order to use these errors for conditional class rendering
        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your account</p>
                        <form noValidate onSubmit={this.onSubmit}>
                            <TextFieldGroup 
                                placeholder='name'
                                name='name'
                                value={this.state.name}
                                onChange={this.onChange}
                                error={errors.name}
                            />
                            <TextFieldGroup 
                                placeholder='Email Address'
                                name='email'
                                type='email'
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}
                                info="This site uses Gravatar so if you want a profile image, use a gravatar email."
                            />
                            <TextFieldGroup 
                                placeholder='Password'
                                name='password'
                                type='password'
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}
                            />
                            <TextFieldGroup 
                                placeholder='Confirm Password'
                                name='password2'
                                type='password'
                                value={this.state.password2}
                                onChange={this.onChange}
                                error={errors.password2}
                            />
                            <input 
                            type="submit" 
                            className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
