const express = require("express");
const router = express.Router();
const {
  GetAllContacts,
  GetTargetContacts,
  UpdateContact,
  DeleteContact,
  PostContact,
} = require("../Controllers/contacts.controller");

// router.get("/all", (res, req) => {
//   req.json({ message: "sadfasf" });
// });

router.get("/contacts/all", GetAllContacts);
router.get("/contacts", GetTargetContacts);
router.post("/contacts", PostContact);
router.put("/contacts/:id", UpdateContact);
router.delete("/contacts/:id", DeleteContact);

module.exports = router;
