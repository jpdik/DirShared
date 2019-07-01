import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from "mdbreact";
import './Homepage.css'
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo'

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = { local: '' }

        this.handleChange = this.handleChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.keyHandler = this.keyHandler.bind(this)
    }


    handleChange(e) {
        this.setState({ ...this.state, local: e.target.value })
    }

    handleSearch(e) {
        const { history } = this.props;
        history.push(this.state.local);
    }

    handleClear(e) {
        this.setState({ ...this.state, local: '' })
    }

    keyHandler = (e) => {
        if (e.key === 'Enter') {
            this.handleSearch();
        } else if (e.key === 'Escape') {
            this.handleClear();
        }
    }

    render() {
        return (
            <MDBContainer>
                <MDBRow center className="mt-6">
                    <MDBCol md="12">
                        <Logo className="text-center"/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody className="mx-4">
                                <div className="text-center">
                                    <h3 className="dark-grey-text mb-5">
                                        <strong>Nao logue, use somente uma URL</strong>
                                        <div className="text-center mt-1">Compartilhe arquivos diretamente</div>
                                    </h3>
                                </div>
                                <MDBRow>
                                    <MDBCol md="5">
                                        <MDBInput
                                            group
                                            value={window.location}
                                            disabled
                                        />
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <MDBInput
                                            label="Ir para local..."
                                            group
                                            type="text"
                                            containerClass="mb-0"
                                            onChange={this.handleChange}
                                            onKeyUp={this.keyHandler}
                                            value={this.state.local}
                                        />
                                    </MDBCol>
                                    <MDBCol md="3" className="vertical-align">
                                        <Link className="text-white btn-block z-depth-1a" to={'/' + this.state.local}>
                                            <MDBBtn
                                                type="button"
                                                gradient="blue"
                                                rounded className="text-white btn-block z-depth-1a">
                                                Encontrar
                                            </MDBBtn>
                                        </Link>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                            <MDBModalFooter className="mx-5 pt-3 mb-1">

                            </MDBModalFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Homepage