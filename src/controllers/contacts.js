import { getAllContacts, getContactById } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
        status: 200,
        message: 'Sucessfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        res.status(404).json({
            message: 'Contact not found',
        });
        return;
    }

    res.json({
        status: 200,
        message: 'Sucessfully found contact with id {contactId}!',
        data: contact,
    });
};