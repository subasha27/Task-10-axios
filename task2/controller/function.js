const { Banner } = require("../model/model")
const multer =  require("multer");
const path = require('path');
const joi = require("@hapi/joi");
const reqSchema = require('../validation/validate')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./views");
  },
  
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }); 

const manageFile = upload.fields([
  { name: 'desktopImage', maxCount: 1 },
  { name: 'mobileImage', maxCount: 1 }
])

const createIt = async(req,res)=>{
    try{
    const existName = await Banner.findOne({name:req.body.name});
    if(existName) { 
      const id = existName._id;
      return res.status(409).json({message: "Already uploaded",id });}

    const mrmed = new Banner({
            name: req.body.name,
            link: req.body.link,
            status: req.body.status,
            desktopImage: req.body.desktopImage,
            mobileImage: req.body.mobileImage,
        })
      const { error, value } = reqSchema.validate(req.body);
      if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
    await mrmed.save();
    res.status(200).send(`Created Id = ${mrmed._id}`)
}
catch(error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const updateIt=async(req,res)=>{
    try {
        const itemId = req.params.id;
        const updatedData = req.body;
        const { error, value } = reqSchema.validate(updatedData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const updatedItem = await Banner.findByIdAndUpdate(itemId, {$set: updatedData}, { new: true });
        if (!updatedItem) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        res.json({ message: "Updated", data: updatedItem });
      } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
};

const deleteIt=async(req,res)=>{
    try {
        const itemId = req.params.id;
    
        const deletedItem = await Banner.findByIdAndDelete(itemId);
        if (!deletedItem) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        res.json({ message: "Deleted", data: deletedItem });
      } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
};

const getIt=async(req,res)=>{
    try {
        const itemId = req.params.id;
    
        const item = await Banner.findById(itemId);
        if (!item) {
          return res.status(404).json({ message: "Item not found" });
        }
    
        res.json({ data: item });
      } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
      }

};


const getAll =async(req,res)=>{
    try {
        const items = await Banner.find().sort({_id : 1});
        res.json({ data: items });
      } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
      }
};




module.exports={
    createIt,
    updateIt,
    deleteIt,
    getIt,
    getAll,
    upload,
    manageFile,
}