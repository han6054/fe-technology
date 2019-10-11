import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import routes from '../routes'

let app = express()

app.use(express.static('public'))

app.get('*',function(req,res) {
    let content = renderToString(
        <StaticRouter location={req.url}>
            {routes}
        </StaticRouter>
    )
  res.send(
    `<html>
     <head><title>react ssr</title></head>
     <body>
      <div id="root">${content}</div>
     </body>
       <script src="/main.js"></script>
    </html>
    `
  )
})

app.listen(9092,()=> {
   console.log('启动成功9092端口')
})