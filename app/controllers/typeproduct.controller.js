const Typeproduct = require("../models/typeproduct.model.js");

// =================================== Création et sauvegarde d'un type de produit ===================================
exports.create = (req, res) => {
  // Validation de la requete
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être vide",
    });
  }

  // Création du type de produit
  const typeproduct = new Typeproduct({
    nameType: req.body.nameType,
  });

  // sauvegarde du type de produit dans la base de données
  Typeproduct.create(typeproduct, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "apparition d'erreurs lors de la création d'un type de produit",
      });
    else res.send(data);
  });
};

// =================================== Récupération de tous les types de produits ===================================
exports.findAll = (req, res) => {
  const nameType = req.query.nameType;
  Typeproduct.getAll(nameType, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Erreurs lors de la récupération des types de produits",
      });
    else res.send(data);
  });
};

// ===================================  Récupération d'un type de produit en fonction de son identifiant ===================================
exports.findOne = (req, res) => {
  Typeproduct.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Aucun type de produit trouvé") {
        res.status(404).send({
          message: `Pas de type de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Erreur de récupération du type de produit avec l'identifiant " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

//  =================================== Modification d'un type de produit ===================================
exports.update = (req, res) => {
  // Validation de la requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être vide!",
    });
  }
  console.log(req.body);
  Typeproduct.updateById(
    req.params.id,
    new Typeproduct(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "Aucun type de produit trouvé") {
          res.status(404).send({
            message: `Pas de type de produit avec l'id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Erreur de récupération du type de produit avec l'identifiant " +
              req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

// ===================================  Suppression d'un type de produit ===================================
exports.delete = (req, res) => {
  Typeproduct.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Aucun type de produit trouvé") {
        res.status(404).send({
          message: `Pas de type de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Impossible de supprimé le type de produit avec l'id " +
            req.params.id,
        });
      }
    } else
      res.send({ message: `Le type de produit a été supprimé avec succès!` });
  });
};
// ===================================  Suppression de tous les produits ===================================
exports.deleteAll = (req, res) => {
  exports.deleteAll = (req, res) => {
    Typeproduct.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message ||
            "Apparition d'erreurs lors de la suppression de tous les types de produits.",
        });
      else
        res.send({ message: `Tous les types de produits ont été supprimés!` });
    });
  };
};
