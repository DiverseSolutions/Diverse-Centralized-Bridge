require('dotenv').config()

const express = require('express')
const { ethers } = require("ethers");

const app = express()
const port = 3500

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
