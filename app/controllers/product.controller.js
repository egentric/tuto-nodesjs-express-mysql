const Product = require("../models/product.model.js");

// =================================== Création et sauvegarde d'un produit ===================================
exports.create = (req, res) => {
  // Validation de la requete
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être vide",
    });
  }

  // Création du produit
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description || false,
    id_typeproduct: req.body.id_typeproduct,
  });

  // sauvegarde du produit dans la base de données
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "apparition d'erreurs lors de la création d'un produit",
      });
    else res.send(data);
  });
};

// =================================== Récupération de tous les produits ===================================
exports.findAll = (req, res) => {
  const name = req.query.name;
  Product.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erreurs lors de la récupération des produits",
      });
    else res.send(data);
  });
};

// ===================================  Récupération d'un produit en fonction de son identifiant ===================================
exports.findOne = (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Aucun produit trouvé") {
        res.status(404).send({
          message: `Pas de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Erreur de récupération du produit avec l'identifiant " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

//  =================================== Modification d'un produit ===================================
exports.update = (req, res) => {
  // Validation de la requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être vide!",
    });
  }
  console.log(req.body);
  Product.updateById(req.params.id, new Product(req.body), (err, data) => {
    if (err) {
      if (err.kind === "Aucun produit trouvé") {
        res.status(404).send({
          message: `Pas de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Erreur de récupération du produit avec l'identifiant " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

// ===================================  Suppression d'un produit ===================================
exports.delete = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Aucun produit trouvé") {
        res.status(404).send({
          message: `Pas de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Impossible de supprimé le produit avec l'id " + req.params.id,
        });
      }
    } else res.send({ message: `Le produit a été supprimé avec succès!` });
  });
};
// ===================================  Suppression de tous les produits ===================================
exports.deleteAll = (req, res) => {
  exports.deleteAll = (req, res) => {
    Product.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message ||
            "Apparition d'erreurs lors de la suppression de tous les produits.",
        });
      else res.send({ message: `Tous les produits ont été supprimés!` });
    });
  };
};
