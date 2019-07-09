import React from 'react'
import { MDBFooter, MDBContainer } from "mdbreact";

export default props => (
    <MDBFooter color="blue" className="font-small">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.jpmdik.com.br"> João Paulo de Melo </a>
        </MDBContainer>
      </div>
    </MDBFooter>
)