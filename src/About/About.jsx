import React from 'react'
import { MDBContainer, Animation, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { Link } from 'react-router-dom';
import { consts } from '../consts';

export default props => (
    <MDBContainer>
        <MDBRow center className="mt-6">
            <MDBCol md="4">
                <Link to="/">
                    <Animation className="text-center" type="rubberBand" duration="1s">
                        <img src="https://mdbootstrap.com/img/logo/mdb-transparent-250px.png" alt="Transparent MDB Logo" />
                    </Animation>
                </Link>
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
                            <MDBCol>
                                <p className="lead">
                                    Com este simples sistema é possível você compartilhar alguns arquivos de forma rápida e prática.
                                </p>
                                <hr className="my-2" />
                                    <MDBListGroup className="mt-5">
                                        <MDBListGroupItem href="#" active>Compartilhe qualquer de arquivo até <b>{consts.MAX_MB} MB</b> de tamanho.</MDBListGroupItem>
                                        <MDBListGroupItem href="#" hover>Pode enviar até 15 arquivos por diretório.</MDBListGroupItem>
                                        <MDBListGroupItem href="#" hover>Não são permitidos <b>{consts.NOT_PERMITED_FILES.map(file => { return `.${file} `})}</b>.</MDBListGroupItem>
                                        <MDBListGroupItem href="#" hover>Você não precisa fazer login!</MDBListGroupItem>
                                        <MDBListGroupItem href="#" hover>Criado por <a href="https://www.jpmdik.com.br">João Paulo de Melo</a>.</MDBListGroupItem>
                                    </MDBListGroup>
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