import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('/create')
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'recibido',
      product: product,
    });
  }
  @Get()
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Ay que me lo quitan de las manos!!',
      products: products,
    });
  }
  @Get('/:_id')
  async getProduct(@Res() res, @Param('_id') _id) {
    const product = await this.productService.getProduct(_id);
    if (!product) throw new NotFoundException("Product doesn't exist");
    return res.status(HttpStatus.OK).json(product);
  }
  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('id') _id) {
    console.log(_id);
    const productDeleted = await this.productService.deleteProduct(_id);
    if (!productDeleted) throw new NotFoundException("Product doesn't exist");
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted',
      product: productDeleted,
    });
  }
  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() updateProduct: CreateProductDTO,
    @Query('id') _id,
  ) {
    const product = await this.productService.updateProduct(_id, updateProduct);
    if (!product) throw new NotFoundException("Product doesn't exist");
    return res.status(HttpStatus.OK).json({
      message: 'Product updated',
      product,
    });
  }
}
