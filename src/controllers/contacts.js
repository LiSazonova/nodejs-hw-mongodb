import { createContact, deleteContact, getAllContacts, getContactById } from "../services/contacts.js";
import createHttpError from 'http-errors';
export const getContactsController = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();

        res.json({
            status: 200,
            message: 'Sucessfully found contacts!',
            data: contacts,
        });
    } catch (err) {
        next(err);
    }
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, "Contact not found");
    }

    res.json({
        status: 200,
        message: `Sucessfully found contact with id ${contactId}!`,
        data: contact,
    });
};
export const createContactController = async (req, res, next) => {
    try {
        const { name, phoneNumber, email, isFavourite, contactType } = req.body;

        if (!name || !phoneNumber || !contactType) {
            throw createHttpError(400, "Missing required fields: name, phoneNumber, and contactType are required");
        }

        const contact = await createContact({ name, phoneNumber, email, isFavourite, contactType });

        res.status(201).json({
            status: 201,
            message: `Successfully created a contact!`,
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};