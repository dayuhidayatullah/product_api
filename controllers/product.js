const { Product } = require("../models");

class ProductController {
  static async getAllProduct(req, res, next) {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    let query = {
      where: {
        isActive: true,
      },
      offset: page * limit,
      limit: req.query.limit,
      attributes: ["id", "name", "qty", "expiredAt", "isActive"],
      order: [["id", "asc"]],
    };
    // sorting
    if (req.query.sortBy && req.query.sortDir) {
      query.order = [[req.query.sortBy, req.query.sortDir.toUpperCase()]];
    }
    try {
      const dataProduct = await Product.findAndCountAll({
        ...query,
      });
      res.status(200).json(dataProduct);
    } catch (error) {
      console.info(error, "<<< error");
      next(error);
    }
  }
  static async getProductById(req, res, next) {
    try {
      const product = await Product.findOne({ where: { id: req.params.id } });
      if (!product) {
        throw {
          name: "productNotFound",
          status: 404,
        };
      }
      console.info(product, "<<< product");
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  static async createProduct({ body }, res, next) {
    try {
      const allProduct = await Product.max("id");
      const payload = {
        id: allProduct + 1,
        name: body.name,
        qty: body.qty,
        picture: body.picture,
        expiredAt: body.expiredAt,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const newProduct = await Product.create(payload);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
  static async updateProduct({ body, params }, res, next) {
    try {
      const payload = {
        name: body.name,
        qty: body.qty,
        picture: body.picture,
        expiredAt: body.expiredAt,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.info(body, params, "<<< params");
      const product = await Product.update(payload, {
        where: { id: params.id },
        returning: true,
      });
      res.status(200).json(product[1][0]);
    } catch (error) {
      console.info(error, "<<< error");
      next(error);
    }
  }
  static async deleteProduct({ params }, res, next) {
    try {
      const product = await Product.findOne({ where: { id: params.id } });
      const updateProduct = await Product.update(
        { ...product, isActive: false },
        { where: { id: params.id } }
      );
      res.status(200).json("Delete Product Success");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
