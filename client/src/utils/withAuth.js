import React from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

function withAuth(ComponentToProtect) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
            API.withAuth()
                .then(res => {
                    if (res.status === 200) {
                        this.setState({loading: false});
                    }
                    else
                        throw new Error(res.error);
                })
                .catch(() => {this.setState({loading: false, redirect: true});});
        }
        render () {
            const { loading, redirect } = this.state;
            if (loading)
                return null;
            if (redirect)
                return <Redirect to="/login" />;
            return <ComponentToProtect {...this.props} />
        }
    }
}


export default withAuth;
