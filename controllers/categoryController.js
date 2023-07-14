import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const CreateCategoryController = async (req,res) => {
    try{
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message: 'Name is Require'});
        }

        const existingCategory = await categoryModel.findOne({name});

        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists',
            });
        }
        const category = await new categoryModel({name, slug: slugify(name)}).save();

        res.status(201).send({
            success: true,
            message: 'New Category Created',
            category,
        });

    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Category',
            err,
        });
    }
};

// Update Category
export const UpdateCategoryController = async (req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});
        res.status(200).send({
            success: true,
            message: 'Category Updated Successfully',
            category,
        });
        
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error while Updating Category',
            err,
        });
    }
};

// Get All Category
export const CategoryController = async (req,res) => {
    try{
        const category = await categoryModel.find({});

        res.status(200).send({
            success: true,
            message: 'All Category List',
            category,
        });
        
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error while getting all Category',
            err,
        });
    }
};

// Single Category
export const SingleCategoryController = async (req,res) => {
    try{
        const category = await categoryModel.findOne({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: 'Get Single Category Successfully',
            category,
        });
        
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error while getting single Category',
            err,
        });
    }
};

// Delete Category
export const deleteCategoryController = async (req,res) => {
    try{
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: 'Category Deleted Successfully',
        });
        
    } catch(err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error while deleting Category',
            err,
        });
    }
};