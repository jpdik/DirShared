import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBModalFooter, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { consts } from '../../consts';
import Logo from '../../components/Logo/Logo';
import DonateButton from '../../components/DonateButton/DonateButton';

export default props => (
    <MDBContainer>
        <MDBRow center className="mt-6">
            <MDBCol md="12">
                <MDBCol md="12">
                    <Logo className="text-center"/>
                </MDBCol>
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
                                    <MDBListGroupItem active>Compartilhe qualquer de arquivo até <b>{consts.MAX_MB} MB</b> de tamanho.</MDBListGroupItem>
                                    <MDBListGroupItem hover>Pode enviar até 15 arquivos por diretório.</MDBListGroupItem>
                                    <MDBListGroupItem hover>Não são permitidos <b>{consts.NOT_PERMITED_FILES.map(file => { return `.${file} ` })}</b>.</MDBListGroupItem>
                                    <MDBListGroupItem hover>Você não precisa fazer login!</MDBListGroupItem>
                                    <MDBListGroupItem hover>Criado por <a href="https://www.jpmdik.com.br">João Paulo de Melo</a>.</MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                    <MDBModalFooter className="mx-5 pt-3 mb-1">
                        <DonateButton />
                    </MDBModalFooter>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
)