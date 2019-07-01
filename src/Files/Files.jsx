import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MDBContainer, Animation, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBListGroup, MDBListGroupItem, MDBModalFooter } from "mdbreact";
import axios from 'axios'
import { Link } from 'react-router-dom';

import { consts } from '../consts'
import Modal from '../common/Modal/modal';

class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            local: this.props.history.location.pathname,
            files: [],
            filesUpload: [],
            loading: true,
            deleteAll: false
        }

        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.clearUpload = this.clearUpload.bind(this);

        this.refresh();
    }

    handleDeleteClicked(status) {
        if (status) this.deleteAllFiles();
    }

    handleUploadFile = (event) => {
        this.setState({ ...this.state, filesUpload: event.target.files });
    }

    showLoader(state = true) {
        this.setState({ ...this.state, loading: true });
    }

    clearUpload() {
        this.setState({ ...this.state, filesUpload: [] });
    }

    uploadFile() {
        let data = new FormData();

        Object.keys(this.state.filesUpload).forEach(key => {
            if (this.state.filesUpload[key].size > consts.MAX_MB * 1024 * 1024) {
                toast.info(`Os arquivos não podem ser maiores que ${consts.MAX_MB} MB!`);
                return;
            }
            else
                data.append('file', this.state.filesUpload[key]);
        })

        if (data.getAll('file').length < 1) toast.info("Selecione ao menos um arquivo.");
        else {
            this.showLoader();
            axios.post(`${consts.URL}${this.state.local}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(resp => {
                    toast.info(resp.data.message);
                    this.refresh();
                })
                .catch(err => {
                    this.showLoader(false);
                    toast.error(err.response.data.message);
                })
                .catch(err => toast.error("Não foi possível realizar essa operação. Tente mais tarde."))
        }
    }

    deleteFile(filepath) {
        this.showLoader();
        axios.delete(`${consts.URL}${this.state.local}/delete?filePath=${filepath}`)
            .then(resp => {
                toast.info(resp.data.message);
                this.refresh();
            })
            .catch(err => {
                this.showLoader(false);
                toast.error(err.response.data.message);
            })
            .catch(err => toast.error("Não foi possível realizar essa operação. Tente mais tarde."))
    }

    deleteAllFiles() {
        this.showLoader();
        axios.delete(`${consts.URL}${this.state.local}/deleteAll`)
            .then(resp => {
                toast.info(resp.data.message);
                this.refresh();
            })
            .catch(err => {
                this.showLoader(false);
                toast.error(err.response.data.message);
            })
            .catch(err => toast.error("Não foi possível realizar essa operação. Tente mais tarde."))
    }

    refresh() {
        axios.get(`${consts.URL}${this.state.local}`)
            .then(resp => this.setState({ ...this.state, files: resp.data.files.length > 0 ? resp.data.files : [{ name: "Nenhum arquivo encontrado.", path_display: '' }], loading: false }))
            .catch(err => this.props.history.goBack())
            .catch(err => toast.error("Não foi possível realizar essa operação. Tente mais tarde."))
    }

    renderLoader() {
        if (this.state.loading)
            return (
                <MDBRow center>
                    <MDBCol md="1">
                        <div className="div-center spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </MDBCol>
                </MDBRow>
            )
    }

    renderFiles() {

        let files = this.state.files || [];

        return files.map((file, index) => (
            <MDBListGroupItem hover key={index}>
                <a href={file.path_display !== '' ? consts.URL + this.state.local + `?filePath=${file.path_display}` : '#'}>
                    {file.name}
                </a>
                <Modal className={'icon right text-white ' + (file.path_display === '' ? 'd-none' : '')}
                    gradient="blue"
                    title={'Apagar arquivo'}
                    onClick={() => this.deleteFile(file.path_display)}
                    text={`Deseja apagar o arquivo ${file.name}?`}
                >
                    <MDBIcon icon="trash" />
                </Modal>
            </MDBListGroupItem>

        )
        );
    }

    renderNameFiles() {
        let nameFiles = this.state.filesUpload || [];

        if (nameFiles.length > 0)
            return Object.keys(nameFiles).map((key, i) => { return (nameFiles[key].name + (i === nameFiles.length - 1 ? '' : ', ')) });
        else
            return 'Escolha um ou mais arquivos'
    }

    render() {
        return (
            <MDBContainer>
                <ToastContainer position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <MDBRow center className="mt-5">
                    <MDBCol md="12">
                        <Link to="/">
                            <Animation type="rubberBand" duration="1s">
                                <img src="https://mdbootstrap.com/img/logo/mdb-transparent-250px.png" alt="Transparent MDB Logo" />
                            </Animation>
                        </Link>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody className="mx-4">
                                <div>
                                    <h3 className="dark-grey-text mb-5">
                                        <strong>Arquivos em: </strong> {this.state.local}
                                    </h3>
                                </div>
                                {this.renderLoader()}
                                <MDBRow>
                                    <MDBCol md="12">
                                        <MDBListGroup>
                                            {this.renderFiles()}
                                        </MDBListGroup>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md="9">
                                        <div className="input-group mt-1">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="inputGroupFile01"
                                                    aria-describedby="inputGroupFileAddon01"
                                                    onChange={(e) => this.handleUploadFile(e)}
                                                    multiple
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                    {this.renderNameFiles()}
                                                </label>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md="3">
                                        <MDBBtn
                                            type="button"
                                            gradient="blue"
                                            rounded className="text-white btn-block z-depth-1a"
                                            onClick={this.uploadFile}>
                                            Upload
                                    </MDBBtn>
                                    </MDBCol>
                                </MDBRow>

                            </MDBCardBody>
                            <MDBModalFooter className="mb-1">
                                <Modal
                                    className="text-white"
                                    gradient="peach"
                                    title={'Apagar todos arquivos'}
                                    text={'Deseja apagar todos os arquivos?'}
                                    value=""
                                    onClick={() => this.handleDeleteClicked(true)}
                                >Apagar tudo</Modal>
                            </MDBModalFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >
        )
    }
}

export default Files