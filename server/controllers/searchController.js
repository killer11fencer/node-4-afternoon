const swag = require('../models/swag')

module.exports = {
    search: (req,res) => {
        const {category} = req.query
        if(!category) {
            res.status(200).send(swag)
        } else {
            let filteredArr = swag.filter(swag => {
                return swag.category === category
            })
            res.status(200).send(filteredArr)
        }
    }
}