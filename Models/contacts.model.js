const { getCollection } = require("./database");
const { ObjectId } = require("mongodb");

const QueryListOfContacts = async () => {
  try {
    const query = {};
    const cursor = getCollection("contacts").find(query);
    const contacts = await cursor.toArray();
    // console.log(contacts);
    return contacts;
  } catch (error) {
    return error;
  }
};
// Get targeted contact with ID
const QueryTargetContact = async (data) => {
  try {
    const query = {};
    if (data.name) {
      query.name = { $regex: data.name, $options: "i" };
    }
    if (data.phone) {
      query.phone = { $regex: data.phone, $options: "i" };
    }
    console.log(query);
    const contacts = await getCollection("contacts")
      .find(query)
      .sort({ name: 1 })
      .toArray();
    return contacts;
  } catch (error) {
    return error;
  }
};

// Post a contact
const QueryPostContact = async (data) => {
  try {
    const contact = data;
    const existingContact = await getCollection("contacts").findOne({
      phone: contact.phone,
    });
    if (existingContact) {
      return { errorCode: 409, message: "Mobile number already exists" };
    }
    const result = await getCollection("contacts").insertOne(contact);
    return result;
  } catch (error) {
    return error;
  }
};

// Update an element
const QueryUpdateContact = async (id, data) => {
  try {
    const contact = data;
    const result = await getCollection("contacts").updateOne(
      { _id: new ObjectId(id) },
      { $set: contact }
    );
    if (result.matchedCount === 0) {
      return { errorCode: 404, message: "not found!" };
    }
    const updatedContact = await getCollection("contacts").findOne({
      _id: new ObjectId(id),
    });
    return updatedContact;
  } catch (error) {
    return error;
  }
};

// Delete contact
const QueryDeleteContact = async (id) => {
  try {
    const result = await getCollection("contacts").deleteOne({
      _id: new ObjectId(id),
    });
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  QueryListOfContacts,
  QueryTargetContact,
  QueryPostContact,
  QueryUpdateContact,
  QueryDeleteContact,
};
