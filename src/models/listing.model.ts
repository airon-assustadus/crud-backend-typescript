import { DataTypes, Sequelize } from 'sequelize'

export default (sequelize: Sequelize) => sequelize.define(
    'listing',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(55),
            allowNull: true,
        },
        price: {
            type: DataTypes.DOUBLE(15, 2),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }
)
