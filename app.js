const express = require("express")
const bodyParser = require("body-parser")

const HttpError = require("./models/ErrorModel")

require('dotenv').config()

const app = express()

app.use(bodyParser.json())

app.get("/", (req, res, next) => {
  res.status(200).json("welcome")
})

app.all("*", (req, res, next) => {
  next(new HttpError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: "fail",
    message: err.message || "Something went wrong!"
  })
}) 

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`)
})
