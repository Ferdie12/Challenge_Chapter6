const {product} = require("../models")
module.exports = {

    getAll : async (req,res,next) => {
        try {
            const products = await product.findAll();
    
            return res.status(200).json({
                status : true,
                message: "succes",
                data : products
            })
        } catch (err) {
            next(err);
        }
    },
    
    getById : async (req,res,next) => {
        try {
            const product_id = req.params.id_product
            const products = await product.findOne({where: {id: product_id}});
    
            if(!products){
                return res.status(404).json({
                    status : false,
                    message: `cannot get product with product id ${product_id}`
                });
            }
    
            return res.status(200).json({
                status : true,
                message: "succes",
                data : {
                    name : products.name,
                    quantity: products.quantity
                }
            });
    
        } catch (err) {
            next(err)
        }
    },
    
    create : async (req,res,next) => {
        try {
            const {name, quantity} = req.body;
    
            if(!name || !quantity){
                return res.status(400).json({
                    status: false,
                    message: "name or quantity is required!"
                })
            }
    
            const exist = await product.findOne({where: {name, quantity}});
            if(exist){
                return res.status(400).json({
                    status: false,
                    message: "product is already created!"
                })
            }
    
            const products = await product.create({name,quantity})
            
            return res.status(201).json({
                status : true,
                message: "succes",
                data : {
                    name : products.name,
                    quantity: products.quantity
                }
            })
        } catch (err) {
            next(err);
        }
    },
    
    update : async (req,res,next) => {
        try {
            const product_id = req.params.id_product
        
            const update = await product.update(req.body, {where: {id: product_id}});
            
            if(!update[0]){
                return res.status(404).json({
                    status : false,
                    message: `cannot update product with product id ${product_id}`
                });
            }
            return res.status(200).json({
                status : true,
                message: "succes"
            });
        } catch (err) {
            next(err)
        }
    },
    
    destroy : async (req,res,next) => {
        try {
            const product_id = req.params.id_product
        
            const deleted = await product.destroy({where: {id: product_id}});
            
            if(!deleted){
                return res.status(404).json({
                    status : false,
                    message: `cannot delete product with product id ${product_id}`
                });
            }
            return res.status(200).json({
                status : true,
                message: "deleted succes",
            });
        } catch (err) {
            next(err)
        }
    }
    
}