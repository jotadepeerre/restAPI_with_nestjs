import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async createProduct(product: CreateProductDTO): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return await createdProduct.save();
  }

  async updateProduct(_id, updateProduct: CreateProductDTO): Promise<Product> {
    const updatedProduct = await this.productModel.findOneAndUpdate(
      _id,
      updateProduct,
      { new: true },
    );
    return updatedProduct;
  }

  async deleteProduct(_id): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(_id);
    return product;
  }
}
