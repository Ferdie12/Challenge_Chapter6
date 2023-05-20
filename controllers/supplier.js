const {supplier} = require("../models")
module.exports = {

    getAll : async (req,res,next) => {
        try {
            const suppliers = await supplier.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                order: [["id", "ASC"]],
              });
    
            return res.status(200).json({
                status : true,
                message: "Get All suppliers succes",
                data : suppliers
            })
        } catch (err) {
            next(err);
        }
    },
    
    getById : async (req,res,next) => {
        try {
            const supplier_id = req.params.id_supplier
            const suppliers = await supplier.findOne({
                where: {id: supplier_id},
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                order: [["id", "ASC"]],
              });
    
            if(!suppliers){
                return res.status(404).json({
                    status : false,
                    message: `cannot get supplier with supplier id not found`
                });
            }
    
            return res.status(200).json({
                status : true,
                message: "Get By Id suppliers succes",
                data : suppliers
            });
    
        } catch (err) {
            next(err)
        }
    },
    
    create : async (req,res,next) => {
        try {
            const {name, address} = req.body;
    
            if(!name || !address){
                return res.status(400).json({
                    status: false,
                    message: "name or address is required!"
                })
            }
    
            const exist = await supplier.findOne({where: {name, address}});
            if(exist){
                return res.status(400).json({
                    status: false,
                    message: "supplier is already created!"
                })
            }
    
            const suppliers = await supplier.create({name, address})
            
            return res.status(201).json({
                status : true,
                message: "created supplier succes",
                data : {
                    id: suppliers.id,
                    name : suppliers.name,
                    address: suppliers.address
                }
            })
        } catch (err) {
            next(err);
        }
    },
    
    update : async (req,res,next) => {
        try {
            const supplier_id = req.params.id_supplier
        
            const update = await supplier.update(req.body, {where: {id: supplier_id}});
            
            if(!update[0]){
                return res.status(404).json({
                    status : false,
                    message: `cannot update supplier with supplier id not found`
                });
            }
            return res.status(200).json({
                status : true,
                message: "updated succes"
            });
        } catch (err) {
            next(err)
        }
    },
    
    destroy : async (req,res,next) => {
        try {
            const supplier_id = req.params.id_supplier
        
            const deleted = await supplier.destroy({where: {id: supplier_id}});
            
            if(!deleted){
                return res.status(404).json({
                    status : false,
                    message: `cannot delete supplier with supplier id not found`,
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