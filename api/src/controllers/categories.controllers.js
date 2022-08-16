require('dotenv').config();
const productList = require('../asset/productList');
const { Categories } = require('../db.js');


 

module.exports = {
    
    getCategories : async (req, res) =>{
        try {
            // Find all categories
            const categories = await Categories.findAll();

            return res.send(categories);
        
        } catch (error) {
            console.error(error);
            res.status(404).send({ error });
        }

    },
    
    preLoadCategories : async (req, res) => {
        try {
    
            let cateArr = [];
            productList.map((el) => {
                let cate = el.categories; 
                
                cateArr.push(cate)
            });
    
            let cateFlat = cateArr.flat();
    
            const cateSet = new Set(cateFlat);
            const cateResult = Array.from(cateSet)
    
            cateResult.map(async el => {
                await Categories.findOrCreate({
                    where:{name: el}
                })
            })
    
    
    
        } catch (error) {
            console.log(error)
            res.status(404).send({ error });
        }
    
    }
};