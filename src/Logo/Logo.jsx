import React from 'react'
import { Animation } from "mdbreact";
import { Link } from 'react-router-dom';

import logo from '../img/logo.png'

export default props => (
    <Link to="/">
        <Animation className={props.className} type="rubberBand" duration="1s">
            <img className="logo" src={logo} alt="DirShared" />
        </Animation>
    </Link>
)