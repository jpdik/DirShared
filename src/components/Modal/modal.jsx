import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleClick(event) {
        this.setState({
            modal: !this.state.modal
        });
        this.props.onClick(event);
    }

    render() {
        return (
            <>
                <MDBBtn className={this.props.className} gradient={this.props.gradient} onClick={this.toggle}>
                    {this.props.children}
                </MDBBtn>

                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}>{this.props.title}</MDBModalHeader>
                    <MDBModalBody>
                        {this.props.value ? this.props.value : this.props.text}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.toggle}>Não</MDBBtn>
                        <MDBBtn color="danger" onClick={() => this.handleClick(this.props.key)}>Sim</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </ >
        );
    }
}

export default Modal;