const {component} = require("../models")
module.exports = {

    getAll : async (req,res,next) => {
        try {
            const components = await component.findAll({
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                order: [["id", "ASC"]],
              });
    
            return res.status(200).json({
                status : true,
                message: "Get All Components succes",
                data : components
            })
        } catch (err) {
            next(err);
        }
    },
    
    getById : async (req,res,next) => {
        try {
            const component_id = req.params.id_component
            const components = await component.findOne({
                where: {id: component_id},
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
                order: [["id", "ASC"]],
              });
    
            if(!components){
                return res.status(404).json({
                    status : false,
                    message: `cannot get component with component id not found`
                });
            }
    
            return res.status(200).json({
                status : true,
                message: "Get By Id Components succes",
                data : components
            });
    
        } catch (err) {
            next(err)
        }
    },
    
    create : async (req,res,next) => {
        try {
            const {name, description} = req.body;
    
            if(!name || !description){
                return res.status(400).json({
                    status: false,
                    message: "name or description is required!"
                })
            }
    
            const exist = await component.findOne({where: {name, description}});
            if(exist){
                return res.status(400).json({
                    status: false,
                    message: "component is already created!"
                })
            }
    
            const components = await component.create({name, description})
            
            return res.status(201).json({
                status : true,
                message: "created component succes",
                data : {
                    id: components.id,
                    name : components.name,
                    description: components.description
                }
            })
        } catch (err) {
            next(err);
        }
    },
    
    update : async (req,res,next) => {
        try {
            const component_id = req.params.id_component
        
            const update = await component.update(req.body, {where: {id: component_id}});
            
            if(!update[0]){
                return res.status(404).json({
                    status : false,
                    message: `cannot update component with component id not found`
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
            const component_id = req.params.id_component
        
            const deleted = await component.destroy({where: {id: component_id}});
            
            if(!deleted){
                return res.status(404).json({
                    status : false,
                    message: `cannot delete component with component id not found`,
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