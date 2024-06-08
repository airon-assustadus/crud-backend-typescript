// const SequelizeMock = require('sequelize-mock')
import { createFunc, findAllFunc, deleteFunc } from "../controllers/listing.controller"
import { v4 as uuid } from 'uuid'
import { getMockRes, getMockReq } from '@jest-mock/express';
import { Listing, sequelize } from "../sequelize.config";

const { res, clearMockRes } = getMockRes()

describe('Test Listing endpoints', () => {

    beforeAll(async () => {
        await sequelize.sync({
            force: true,
            alter: true,
        })
    })

    beforeEach(() => {
        clearMockRes()
    })

    describe('create listing', () => {
        it("should create a new listing without any error", async () => {
            const listing = {
                title: 'Testing Listing',
                price: 123.45,
                description: 'Some nice description',
                id: uuid()
            }

            const req = getMockReq({
                body: listing
            })
            await createFunc(req, res)
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.contentType).toHaveBeenCalledWith('application/json');
        })
        it("should throw an error price is not a number", async () => {
            const listing = {
                title: 'Testing Listing',
                price: '123.4a',
                description: 'Some nice description',
                id: uuid()
            }

            const req = getMockReq({
                body: listing
            })
            await createFunc(req, res)
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    code: 400,
                    message: 'Price field should be a number'
                })
            )
        })
    })

    describe('delete listing', () => {
        let id = '9a4ba3c1-d5c2-491a-9650-9657d2e64550'
        beforeAll(async () => {
            await Listing.create({
                title: 'Testing Listing',
                price: 123.45,
                description: 'Some nice description',
                id
            })
        })
        it("should delete without any error", async () => {

            const req = getMockReq({
                params: {
                    id
                }
            })

            await deleteFunc(req, res)
            expect(res.status).toHaveBeenCalledWith(202);
            expect(res.send).toHaveBeenCalledWith('Entity deleted ok');
        })
        it("should throw an error Entity not found", async () => {
            const id = uuid()

            const req = getMockReq({
                params: {
                    id
                }
            })
            await deleteFunc(req, res)
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    error: 'Entity Not Found to Delete'
                })
            )
        })
    })

    describe('find all listing', () => {
        beforeAll(async () => {
            await Listing.create({
                title: 'Testing Listing',
                price: 123.45,
                description: 'Some nice description',
                id: uuid()
            })
        })
        it("should return at least one registry", async () => {

            const req = getMockReq()

            await findAllFunc(req, res)
            expect(res.status).toHaveBeenCalledWith(200);
        })

    })

});