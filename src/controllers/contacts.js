import { getAllContacts, getContactById } from "../services/contacts.js";
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