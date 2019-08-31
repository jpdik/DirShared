import React from 'react'
import { MDBFooter, MDBContainer } from "mdbreact";

export default props => (
    <MDBFooter color="primary-color">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid className="white-text">
          &copy; {new Date().getFullYear()} Copyright: <a className="bold" href="https://www.jpmdik.com.br"> João Paulo de Melo </a>
        </MDBContainer>
      </div>
    </MDBFooter>
)