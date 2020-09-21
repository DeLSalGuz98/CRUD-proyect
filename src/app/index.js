import React from 'react';
import ReactDom from 'react-dom';
import Header from './Header';
import Crud from './Body';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            background : "white",
            themeState: false
        }
        this.handleClickChangeTheme = this.handleClickChangeTheme.bind(this);
    }
    UpdateState(color, option){
        this.setState({
            background: color,
            themeState: option
        });
    }
    handleClickChangeTheme(){
        if(this.state.themeState === false){
            this.UpdateState("#6E6E6E", true);
        }else{
            this.UpdateState("white", false);
        }
    }
    render(){
        return(
            <React.Fragment>
                <Header handleClickChangeThemeProp={this.handleClickChangeTheme}/>
                <Crud style={ { background: this.state.background } }/>
            </React.Fragment>
        );
    }
}

ReactDom.render(
    <App/>, document.getElementById('root_app')
);