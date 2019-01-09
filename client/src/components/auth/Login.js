import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import  classnames  from 'classnames';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
    constructor () {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        // Bind events
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Create onChange form event
    onChange(e) {
        this.setState( { [e.target.name]: e.target.value } );
    }

    // Create onSubmit form event
    onSubmit(e) {
        // prevent default form submit behaviour
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
    
        // Call the action
        this.props.loginUser(userData);
    }

    componentWillReceiveProps(nextProps) {
        // Check if the user is authedicated and redirect
        if(nextProps.auth.isAuthedicated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState( { errors: nextProps.errors} );
        }
    }

    render() {
        // Get errors from the state, in order to use these errors for conditional class rendering
        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input 
                                    type="email" 
                                    className={ classnames('form-control form-control-lg', {
                                        'is-invalid': errors.email
                                    })} 
                                    placeholder="Email Address" 
                                    name="email" 
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    />
                                    {errors.email && (<div className="invalid-feedback"> {errors.email} </div>) }
                                </div>
                                <div className="form-group">
                                    <input 
                                    type="password" 
                                    className={ classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password
                                    })} 
                                    placeholder="Password" 
                                    name="password" 
                                    value={this.state.password} 
                                    onChange={this.onChange}
                                    />
                                    {errors.password && (<div className="invalid-feedback"> {errors.password} </div>) }
                                </div>
                                    <input 
                                    type="submit" 
                                    className="btn btn-info btn-block mt-4"
                                    />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser })(Login);
