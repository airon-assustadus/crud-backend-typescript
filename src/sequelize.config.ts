import { Sequelize } from 'sequelize';
import listingModel from './models/listing.model';

const createSequelizeObject = () => {
    if (process.env.NODE_ENV === 'test') {
        return new Sequelize(
            'sqlite::memory', {
            logging: true
        })
    }
    return new Sequelize(
        'crud_rest_template', 'postgres', '', {
        host: 'localhost',
        dialect: 'postgres'
    })
}

const sequelize = createSequelizeObject();

const Listing = listingModel(sequelize);

export {
    sequelize,
    Listing
}