import React, { Component } from 'react';

class AdminSectionHeader extends Component {
    state = {
        isOpen:true
    }

    render() {
        const { title } = this.props
        return (
            <header 
                className={this.state.isOpen? "conf-step__header conf-step__header_opened":"conf-step__header conf-step__header_closed"}
                onClick={() => this.setState({ isOpen:!this.state.isOpen })} >
                  <h2 className="conf-step__title">{ title }</h2>
           </header>
        );
    }
}

export default AdminSectionHeader;




