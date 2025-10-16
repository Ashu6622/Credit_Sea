const Report = require('../model/Report.js')


async function getAllData(req, res, next){

    try{
        const allData = await Report.find();

        return res.json({success:true, status:201, data:allData})
    }
    catch(error){
        next(error);
    }
}


async function getUniqueData(req, res, next){

    try{
        const {id} = req.params;
        // console.log(typeof id);

        // find the data using the provided id
        const singleData = await Report.findById(Object(id))
        // const singleData = await Report.findOne({_id:id})

        if(!singleData){
            const error = new Error('Report not found');
            error.statusCode = 404;
            return next(error);
        }

        return res.json({success:true, status:201, data:singleData});
    }
    catch(error){
        next(error);
    }
}


async function deleteData(req, res, next){

    try{
        const {id} = req.params;

        const deletedReport = await Report.findByIdAndDelete({_id:id});
        
        if(!deletedReport){
            const error = new Error('Report not found');
            error.statusCode = 404;
            return next(error);
        }
        
        return res.json({success:true, status:200, message:'Deleted Successfully'});
    }
    catch(error){
        next(error);
    }
}

module.exports = {getAllData, getUniqueData, deleteData}