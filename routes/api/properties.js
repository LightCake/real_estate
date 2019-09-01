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

// Get min and max values of one column
router.get("/minmax/:column", (request, response) => {
  db.query(
    `SELECT min(${request.params.column}), max(${request.params.column}) from properties`,
    (err, res) => {
      if (err) throw err;

      if (res) {
        data = res.rows[0];
        response.send(data);
      }
    }
  );
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

// Get properties with offset and limit
router.get(
  "/filter/:page/:limit/:minprice/:maxprice/:minsize/:maxsize",
  (request, response) => {
    const offset = (request.params.page - 1) * request.params.limit;
    db.query(
      "SELECT * FROM properties WHERE price >= $1 AND price <= $2 AND size >= $3 AND size <= $4 LIMIT $5 OFFSET $6",
      [
        request.params.minprice,
        request.params.maxprice,
        request.params.minsize,
        request.params.maxsize,
        request.params.limit,
        offset
      ],
      (err, res) => {
        if (err) throw err;

        if (res) {
          response.send(res.rows);
        }
      }
    );
  }
);

module.exports = router;
