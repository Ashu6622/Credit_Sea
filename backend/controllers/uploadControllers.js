const parseXmlToReport = require("../utils/xmlParser");
const Report = require('../model/Report.js')

async function uploadXML(req, res, next){
  try {
    if (!req.file){
        const error = new Error("No file uploaded");
        error.statusCode = 400;
        return next(error);
    }

    const xmlText = req.file.buffer.toString("utf-8");
    const report = await parseXmlToReport(xmlText);

    const data = await Report.create(report)

    return res.json({
      success: true,
      message: "XML parsed successfully",
      status:201,
      data: data,
    });
  } 
  catch (err) {
    next(err);
  }
};

module.exports = uploadXML