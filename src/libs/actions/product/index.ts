"use server";
import connectToDatabase from "@/libs/database/dbConnect";
import Product from "@/libs/database/models/product.model";
import { CreateProductParams, ProductParams } from "@/types/product";
import { handleError } from "@/utils/handle-error";

// create new product
export const createNewProduct = async ({ product }: CreateProductParams) => {
  try {
    await connectToDatabase();

    const newProduct = await Product.create(product);

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    handleError(error);
  }
};

// get all products
export const getAllProducts = async () => {
  try {
    await connectToDatabase();

    const products = await Product.find({});

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    handleError(error);
  }
};

// delete product
export const deleteProduct = async (id: string) => {
  try {
    await connectToDatabase();

    const product = await Product.findByIdAndDelete(id);

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
};

// get single product
export const getSingleProduct = async (id: string) => {
  try {
    await connectToDatabase();

    const product = await Product.findById(id);

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    handleError(error);
  }
};

// get flash sale products
export const getFlashSaleProducts = async () => {
  try {
    await connectToDatabase();

    const flashSaleProducts = await Product.find({ flashSale: true });

    return JSON.parse(JSON.stringify(flashSaleProducts));
  } catch (error) {
    handleError(error);
  }
};

// get best selling products
export const getBestSellingProducts = async () => {
  try {
    await connectToDatabase();

    const bestSellingProducts = await Product.find({ bestSelling: true });

    return JSON.parse(JSON.stringify(bestSellingProducts));
  } catch (error) {
    handleError(error);
  }
};

// get explore products
export const getExploreProducts = async () => {
  try {
    await connectToDatabase();

    const exploreProducts = await Product.find({ explore: true });

    return JSON.parse(JSON.stringify(exploreProducts));
  } catch (error) {
    handleError(error);
  }
};

// update product
export const updateProduct = async ({ product }: ProductParams) => {
  try {
    await connectToDatabase();

    const productToUpdate = await Product.findById(product._id);
    if (!productToUpdate) {
      throw new Error("Product not found");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { ...product },
      {
        new: true,
      }
    );

    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (error) {
    handleError(error);
  }
};
