const {supplier} = require("../models")
module.exports = {

getAll : async (req,res,next) => {
    try {
        const suppliers = await supplier.findAll();

        return res.status(200).json({
            status : true,
            message: "succes",
            data : suppliers
        })
    } catch (err) {
        next(err);
    }
},

getById : async (req,res,next) => {
    try {
        const supplier_id = req.params.id_supplier
        const suppliers = await supplier.findOne({where: {id: supplier_id}});

        if(!suppliers){
            return res.status(404).json({
                status : false,
                message: `cannot get supplier with supplier id ${supplier_id}`
            });
        }

        return res.status(200).json({
            status : true,
            message: "succes",
            data : {
                name: suppliers.name,
                email: suppliers.email,
                address: suppliers.address
            }
        });

    } catch (err) {
        next(err)
    }
},

create : async (req,res,next) => {
    try {
        const {name, email, address} = req.body;

        if(!name || !email || !address){
            return res.status(400).json({
                status: false,
                message: "name and email is required!"
            })
        }

        const exist = await supplier.findOne({where: {email}});
        if(exist){
            return res.status(400).json({
                status: false,
                message: "email is already created!"
            })
        }

        const suppliers = await supplier.create({
            name: name,
            email: email,
            address : address
        })
        
        return res.status(201).json({
            status : true,
            message: "succes",
            data : {
                name: suppliers.name,
                email: suppliers.email,
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
                message: `cannot update supplier with supplier id ${supplier_id}`
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
                message: `cannot delete supplier with supplier id ${supplier_id}`
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