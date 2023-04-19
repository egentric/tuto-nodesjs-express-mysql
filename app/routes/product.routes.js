module.exports = (app) => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();
  // Crée un nouveau produit
  router.post("/", products.create);
  // Récupère tous les produits
  router.get("/", products.findAll);
  // Récupère un produit en fonction de son id
  router.get("/:id", products.findOne);
  // Modifie un produit
  router.put("/:id", products.update);
  // Supprime un produit
  router.delete("/:id", products.delete);
  // Supprime tous les produits
  router.delete("/", products.deleteAll);
  app.use("/api/products", router);

  const typeproducts = require("../controllers/typeproduct.controller.js");
  var router = require("express").Router();
  // Crée un nouveau type de produit
  router.post("/", typeproducts.create);
  // Récupère tous les types de produits
  router.get("/", typeproducts.findAll);
  // Récupère un type de produit en fonction de son id
  router.get("/:id", typeproducts.findOne);
  // Modifie un type de produit
  router.put("/:id", typeproducts.update);
  // Supprime un type de produit
  router.delete("/:id", typeproducts.delete);
  // Supprime tous les types de produits
  router.delete("/", typeproducts.deleteAll);
  app.use("/api/typeproducts", router);
};
