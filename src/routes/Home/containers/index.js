import React, { Component } from 'react'
import SectionMain from '../components/SectionMain'
import { connect } from 'react-redux'
import { Init } from '../modules/'

class App extends Component {
    componentWillMount(){
        const {init} = this.props;
        init();
    }

    render() {
        let {...rest} = this.props;
        return (
            <div style={{padding:'5px'}}>
                {rest.data.length == 0 ? '' : <SectionMain
                    data = {rest.data}
                />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data:state.home
})

const mapDispatchToProps = {
    init:() => Init()
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
