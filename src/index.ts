import { sequelize } from './sequelize.config'
import app from './express.config'

const port = 3001


Promise.all([
    sequelize.authenticate(),
    sequelize.sync({
        force: false,
        alter: true,
    }),
    app.listen(port)
]).then(() => {
    console.log('System started on port', port)
    console.log('Connection OK')
})

