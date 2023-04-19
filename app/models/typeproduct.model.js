const sql = require("./db.js");
//  =================================== Le constructeur ===================================
const Typeproduct = function (typeproduct) {
  this.nameType = typeproduct.nameType;
};

// =================================== Créer un type produit ===================================
Typeproduct.create = (newTypeproduct, result) => {
  sql.query("INSERT INTO typeproducts SET ?", newTypeproduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created typeproduct: ", {
      id: res.insertId,
      ...newTypeproduct,
    });
    result(null, { id: res.insertId, ...newTypeproduct });
  });
};

// =================================== Affichage d'un type de produit grâce à son identifiant ===================================
Typeproduct.findById = (id, result) => {
  sql.query(`SELECT * FROM typeproducts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Type de produit trouvé: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "Aucun type de produit ne correspond" }, null);
  });
};

// =================================== Affichage de tous les produits ===================================
Typeproduct.getAll = (nameType, result) => {
  let query = "SELECT * FROM typeproducts";
  if (nameType) {
    query += ` WHERE name LIKE '%${nameType}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    console.log("Typeproduits: ", res);
    result(null, res);
  });
};

// =================================== Modification d'un produit ===================================
Typeproduct.updateById = (id, typeproduct, result) => {
  sql.query(
    "UPDATE typeproducts SET nameType = ? WHERE id = ?",
    [typeproduct.nameType, id],
    (err, res) => {
      if (err) {
        console.log("Erreur: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "Aucun type de produit ne correspond" }, null);
        return;
      }
      console.log("type de produit modifié: ", { id: id, ...typeproduct });
      result(null, { id: id, ...typeproduct });
    }
  );
};

// =================================== Suppression d'un produit ===================================
Typeproduct.remove = (id, result) => {
  sql.query("DELETE FROM typeproducts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "Aucun type de produit ne correspond" }, null);
      return;
    }
    console.log("Suppression du type de produit avec l'identifiant: ", id);
    result(null, res);
  });
};

// =================================== Suppression de tous les produits ===================================
Typeproduct.removeAll = (result) => {
  sql.query("DELETE FROM typeproducts", (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    console.log(`Suppression de ${res.affectedRows} typeproduits`);
    result(null, res);
  });
};
module.exports = Typeproduct;
