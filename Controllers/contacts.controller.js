const {
  QueryListOfContacts,
  QueryTargetContact,
  QueryUpdateContact,
  QueryDeleteContact,
  QueryPostContact,
} = require("../Models/contacts.model");
const { addTime } = require("../Utils/timestamp");

// Get all contacts in the collection
const GetAllContacts = async (req, res) => {
  const contactList = await QueryListOfContacts();
  return res.json(contactList);
};

// Get one contact
const GetTargetContacts = async (req, res) => {
  const data = { name: req.query.name, phone: req.query.phone };
  const targetContacts = await QueryTargetContact(data);
  if (!targetContacts) {
    return res.status(404).send({ message: "data not found" });
  }
  return res.send(targetContacts);
};
// Get phase matching contacts based on address
const PostContact = async (req, res) => {
  let data = req.body; //name and phone
  data = addTime(data);
  console.log(data);
  const postContacts = await QueryPostContact(data);
  if (postContacts.errorCode) {
    return res.status(postContacts.errorCode).send(postContacts);
  }
  return res.send(postContacts);
};
// Update Contact
const UpdateContact = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  const updateResult = await QueryUpdateContact(id, req.body);
  console.log(updateResult);
  if (updateResult.errorCode) {
    return res.status(updateResult.errorCode).send(updateResult);
  }
  return res.json(updateResult);
};
// Delete contact
const DeleteContact = async (req, res) => {
  const deleteResult = await QueryDeleteContact(req.params.id);
  if (result.deletedCount === 0) {
    return res.status(404).send({ errorCode: 404, message: "not found!" });
  }
  return res.send(deleteResult);
};

module.exports = {
  GetAllContacts,
  GetTargetContacts,
  UpdateContact,
  DeleteContact,
  PostContact,
};
