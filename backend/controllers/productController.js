const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

const formatProduct = (product) => {
  const { id, ...rest } = product;
  return { _id: id, id, ...rest };
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products.map(formatProduct));
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (product) {
      res.json(formatProduct(product));
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

module.exports = {
  getProducts,
  getProductById,
};
