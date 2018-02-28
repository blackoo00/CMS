import React from 'react';
import {browserHistory} from 'react-router';

class App extends React.Component{
    componentWillMount(){
        const pathname = this.props.location.pathname;
        if(pathname == '/'){
            browserHistory.push('/home');
        }
    }
    render(){
        return(
            <div>welcome</div>
        )
    }
}

export default App
