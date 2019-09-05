const express = require("express");
const passport = require("passport");
const db = require("../../db");
const validatePropertyInput = require("../../validation/properties");

const router = express.Router();

// Get all properties
router.get("/", (request, response) => {
  db.query("SELECT * FROM properties", (err, res) => {
    if (err) throw err;

    if (res.rows.length > 0) {
      response.send(res.rows);
    } else {
      response.send({ msg: "No properties" });
    }
  });
});

// Get number of properties
router.get("/count", (request, response) => {
  db.query("SELECT COUNT(*) FROM properties", (err, res) => {
    if (err) throw err;

    if (res) {
      response.send(res.rows[0]);
    }
  });
});

// Get all properties listed by an user
router.get("/user/:user_id", (request, response) => {
  db.query(
    "SELECT * FROM properties WHERE owner_id=$1",
    [request.params.user_id],
    (err, res) => {
      if (err) throw err;

      if (res.rows.length > 0) {
        response.json(res.rows);
      } else {
        response
          .status(404)
          .json({ nopropertiesfound: "No properties found from that user" });
      }
    }
  );
});

// Fetch default values of the filter
router.post("/set_filter", (request, response) => {
  const min_max = request.body.min_max;
  console.log(request.body);
  let query = "SELECT";
  for (let i = 0; i < min_max.length; i++) {
    query += ` min(${min_max[i]}) as ${"min_" + min_max[i]}, max(${
      min_max[i]
    }) as ${"max_" + min_max[i]}${i !== min_max.length - 1 ? "," : ""}`;
  }
  query += " from properties";
  console.log("Query: ", query);
  db.query(query, (err, res) => {
    if (err) throw err;

    if (res) {
      const data = {};
      data.min_max = res.rows[0];

      const distinct = request.body.distinct;
      let query = "SELECT DISTINCT";
      for (let i = 0; i < distinct.length; i++) {
        query += ` ${distinct[i]}${i !== distinct.length - 1 ? "," : ""}`;
      }
      query += " from properties";
      db.query(query, (err, res) => {
        if (err) throw err;

        if (res) {
          data.distinct = res.rows;
          response.send(data);
        }
      });
    }
  });
});

// Get unique values of one column
router.get("/unique/:column", (request, response) => {
  db.query(
    `SELECT distinct ${request.params.column} from properties`,
    (err, res) => {
      if (err) throw err;

      if (res) {
        const arr = [];
        for (let obj of res.rows) {
          arr.push(obj[request.params.column]);
        }
        response.send(arr);
      }
    }
  );
});

// Get property by ID
router.get("/:id", (request, response) => {
  db.query(
    "SELECT * FROM properties WHERE id=$1",
    [request.params.id],
    (err, res) => {
      if (err) throw err;

      if (res.rows.length > 0) {
        response.send(res.rows);
      } else {
        response.status(404).json({ nopropertyfound: "No property found" });
      }
    }
  );
});

// Get the newest n properties
router.get("/newest/:n", (request, response) => {
  db.query(
    "SELECT * FROM properties ORDER BY created desc limit $1",
    [request.params.n],
    (err, res) => {
      if (err) throw err;

      response.send(res.rows);
    }
  );
});

// List new property
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const { errors, isValid } = validatePropertyInput(request.body);

    if (!isValid) {
      return response.status(400).json(errors);
    }

    const { type, price, size, description, built, bed, bath } = request.body;

    db.query(
      "INSERT INTO properties (owner_id, type, price, size, description, built, bedrooms, bathrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [request.user.id, type, price, size, description, built, bed, bath],
      (err, res) => {
        if (err) throw err;

        response.send(res.rows[0]);
      }
    );
  }
);

// Add image reference url to property_images table
router.post(
  "/add-images",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    let query = "INSERT INTO property_images (property_id, img_ref) VALUES ";
    request.body.images.forEach((image, i) => {
      query += `('${request.body.id}', '${image}')${
        request.body.images.length - 1 !== i ? "," : ""
      }`;
    });
    db.query(query, (err, res) => {
      if (err) throw err;

      response.send({ msg: "success" });
    });
  }
);

// Add property address
router.post(
  "/add-address",
  passport.authenticate("jwt", { session: false }),
  (request, response) => {
    const { id, street, city, state, postal_code, country } = request.body;

    db.query(
      "INSERT INTO property_addresses (property_id, street, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, street, city, state, postal_code, country],
      (err, res) => {
        if (err) throw err;

        if (res) {
          response.send({ msg: "success" });
        }
      }
    );
  }
);

// Get filtered properties
router.post("/filter", (request, response) => {
  const {
    currentPage,
    pageLimit,
    size,
    price,
    selectedType,
    selectedBedrooms,
    selectedBathrooms
  } = request.body;
  console.log(request.body);
  const offset = (currentPage - 1) * pageLimit;
  db.query(
    "SELECT * FROM properties WHERE price >= $1 AND price <= $2 AND size >= $3 AND size <= $4 AND ($5 = '' or type = $5) AND ($6 = '' or bedrooms = $6::integer) AND ($7 = '' or bathrooms = $7::integer) LIMIT $8 OFFSET $9",
    [
      price[0],
      price[1],
      size[0],
      size[1],
      selectedType.value,
      selectedBedrooms.value,
      selectedBathrooms.value,
      pageLimit,
      offset
    ],
    (err, res) => {
      if (err) throw err;

      if (res) {
        response.send(res.rows);
      }
    }
  );
});

module.exports = router;
