import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page, perPage }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find();
    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery.skip(skip).limit(limit).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData,
    };
};

export const getContactById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
    const updatedContact = await ContactsCollection.findByIdAndUpdate(
        contactId,
        payload,
        {
            new: true,
            ...options,
        },
    );

    if (!updatedContact) return null;
    return updatedContact;
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete({ _id: contactId });
    return contact;
};