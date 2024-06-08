import { Express, Request, Response } from 'express';
import { Listing } from '../sequelize.config'

const createFunc = async (req: Request, res: Response) => {
    const listing = req.body

    if (typeof listing.price !== 'number') {
        res.status(400).send({
            code: 400,
            message: 'Price field should be a number'
        })
        return;
    }
    res.contentType('application/json')
    const newListing = await Listing.create(listing)
    res.status(201).send(newListing)
}

const deleteFunc = async (req: Request, res: Response) => {
    const { id } = req.params
    const listing = await Listing.findOne({ where: { id } })
    if (!listing) {
        res.status(404).send({
            error: "Entity Not Found to Delete"
        })
    } else {
        await listing.destroy()
        res.status(202).send('Entity deleted ok')
    }
}

const findAllFunc = async (_: Request, res: Response) => {
    const listings = await Listing.findAll()
    res.status(200).send(listings)
}

export default (app: Express) => {
    app.post('/listings', createFunc);
    app.get('/listings', findAllFunc);
    app.delete('/listings/:id', deleteFunc)
}

export {
    createFunc,
    deleteFunc,
    findAllFunc
}