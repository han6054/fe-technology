import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import routes from "../routes";

ReactDom.hydrate(
    <BrowserRouter>
        {routes}
    </BrowserRouter>,
   document.getElementById('root')
)