import React, {Component} from 'react';
import {connect} from 'react-redux';
import Login from '../components/';
import { handleAccount, handlePassword } from '../modules/counter'
import * as controllers from '../controller/';

class App extends Component {
    render(){
        const {...rest} = this.props;
        return(
            <div>
                <Login
                    login = {() => {rest.login(rest.ac,rest.se)}}
                    handleAccount = {e => {rest.handleAccount(e.target.value)}}
                    handlePassword = {e => {rest.handlePassword(e.target.value)}}
                    ac = {rest.ac}
                    se = {rest.se}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ac:state.login.ac,
    se:state.login.se
})

const mapDispatchToProps = {
    login:(ac,se) => controllers.Login(ac,se),
    handleAccount:value => handleAccount(value),
    handlePassword:value => handlePassword(value)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
