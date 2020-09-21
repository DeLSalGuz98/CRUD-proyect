import React from 'react';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.handleClickChangeTheme = this.handleClickChangeTheme.bind(this);
    }
    handleClickChangeTheme(e){
        e.preventDefault();
        this.props.handleClickChangeThemeProp();
        
    }
    render(){
        return(
            <header>
                <h1>CRUD</h1>
                <span>
                    <a href="#" onClick={this.handleClickChangeTheme}><i className="fas fa-adjust"></i></a>
                </span>
            </header>
        );
    }
}

export default Header;