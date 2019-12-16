import React from "react";
import API from "../../utils/API";
import {Button, Container, Form, Image, Grid, Divider, Dimmer,Loader} from "semantic-ui-react";
import Warnings from "../Warnings/Warnings";
import validate from '../../utils/validation';

const DEFAULT_STATE = {
    lastname: "",
    firstname: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
    warnings: [],
    loading: false,
    w_lastname: '',
    w_firstname: '',
    w_email: '',
    w_username: '',
    w_password: '',
    w_cpassword: '',
    fetch: false,
};

const DEFAULT_ERRORS = {
    w_lastname: '',
    w_firstname: '',
    w_email: '',
    w_username: '',
    w_password: '',
    w_cpassword: '',
};

class Signup extends React.Component {
    constructor (props){
        super(props);
        this.state = {...DEFAULT_STATE};
        this.warnings = {...DEFAULT_ERRORS};
    }

    componentDidMount() {
        this._mounted = true;
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    send = async() => {
        const {lastname, firstname, email, username, password, cpassword} = this.state;
        this.warnings = {...DEFAULT_ERRORS};
        if (!validate.validateEmail(email))
            this.warnings.w_email = "Please enter a valid email.";
        if (!validate.validatePassword(password))
            this.warnings.w_password = "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.";
        if (cpassword.localeCompare(password) !== 0)
            this.warnings.w_cpassword = "Password does not match.";
        if (!validate.validateUsername(username))
            this.warnings.w_username = "Please use a valid username.";
        if (!validate.validateFirstName(firstname))
            this.warnings.w_firstname = "Please use a valid first name.";
        if (!validate.validateFirstName(lastname))
            this.warnings.w_lastname = "Please use a valid last name.";
        // Check if warning is set
        if (!validate.checkWarnings(this.warnings)){
            console.log(33434);
            if(this._mounted)
                this.setState({loading: true});
            await validate.sleepLoader(1200)
                .then(async () => {
                    await API.signup(lastname, firstname, email, username, password, cpassword)
                        .then(() => {
                            this.props.history.push('/login');
                        })
                        .catch(error => {
                            if (typeof error.response.data !== 'undefined' && typeof error.response.data.warnings !== 'undefined')
                                    if(this._mounted)
                                        this.setState({...error.response.data.warnings});
                            });
                });
            if (this._mounted)
                this.setState({loading: false});
        }
        else if (this._mounted) {
            this.setState({...this.warnings});
        }
    };

    handleChange = (event) => {
        const key = "w_" + event.target.id;
        if (this.state[key].length > 0)
            this.setState({[key]: ''});
        this.setState({[event.target.id]: event.target.value});
    };

    render() {
        const {w_firstname, w_lastname, w_email, w_password, w_username, w_cpassword, loading} = this.state;
        return (
        <Container className="signupModal">
            <Dimmer active={loading}>
                <Loader size='massive'>Create your account...</Loader>
            </Dimmer>
            <div className="shapeSignup"></div>
            <Divider hidden />
            <Image className="img-fluid"
                   src="/img/MatchApp-Logo.png"
                   alt="Responsive image"
                   size="medium"
                   centered/>
           <Grid textAlign="center">
               <Grid.Row centered>
                   <div className="signupWarnings">
                       <Warnings data={this.state.warnings.warnings} />
                   </div>
               </Grid.Row>
           </Grid>
            <Divider hidden />
            <Container textAlign='center'>
                <h1 className="signuph1">Create an account</h1>
            </Container>
            <Divider hidden />
            <Form className="signupForm">
                <Form.Group widths='equal'>
                        <Form.Input
                            error={w_firstname.length > 0 ? w_firstname : null}
                            label="First Name"
                            id="firstname"
                            icon='user'
                            iconPosition='left'
                            autoFocus
                            onChange={this.handleChange}
                            size="huge"
                            placeholder="First Name"
                            autoComplete="off" />
                        <Form.Input
                            error={w_lastname.length > 0 ? w_lastname : null}
                            label="Last Name"
                            id="lastname"
                            icon='user'
                            iconPosition='left'
                            onChange={this.handleChange}
                            size="huge"
                            placeholder="Last Name"
                            autoComplete="off" />
                </Form.Group>
                <Form.Group widths='equal' onSubmit={this.send}>
                    <Form.Input
                        error={w_email.length > 0 ? w_email : null}
                        label="Email"
                        id="email"
                        icon='mail'
                        iconPosition='left'
                        onChange={this.handleChange}
                        size="huge"
                        placeholder="Email"
                        autoComplete="off" />
                    <Form.Input
                        error={w_username.length > 0 ? w_username : null}
                        label="Choose a username"
                        id="username"
                        icon='user circle'
                        iconPosition='left'
                        onChange={this.handleChange}
                        size="huge"
                        placeholder="Choose a username"
                        autoComplete="off" />
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input
                        error={w_password.length > 0 ? w_password : null}
                        label="Password"
                        icon='lock'
                        iconPosition='left'
                        id="password"
                        onChange={this.handleChange}
                        type="password"
                        size="huge"
                        placeholder="Password" />
                    <Form.Input
                        error={w_cpassword.length > 0 ? w_cpassword : null}
                        label="Confirm Password"
                        icon='lock'
                        iconPosition='left'
                        id="cpassword"
                        onChange={this.handleChange}
                        type="password"
                        size="huge"
                        placeholder="Confirm Password" />
                </Form.Group>
                <Divider hidden />
                <Grid textAlign="center">
                    <Grid.Row centered>
                        <Button
                            className="signupButton"
                            loading={this.state.loading}
                            size='huge'
                            type="submit"
                            onClick={this.send}>Register
                        </Button>
                    </Grid.Row>
                </Grid>
                <Divider hidden />
            </Form>
            <Grid textAlign="center">
                <Grid.Row centered>
                    <div className="signupNoAccount">
                        <p>Have an account ? <a href="/login">Log in</a></p>
                    </div>
                </Grid.Row>
            </Grid>
            <Divider hidden />
        </Container>
        );
    }
}

export default Signup;