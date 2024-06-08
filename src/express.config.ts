import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import listingController from './controllers/listing.controller'

const app = express()

app.use(compression())
app.use(bodyParser.json())

listingController(app)

export default app;
