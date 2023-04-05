module.exports = (err, req, res, next) => {
  switch (err.name) {
    case "productNotFound":
      res.status(401).json({ message: "Product Not Found" });
    default:
      res.status(500).json(err);
  }
};
