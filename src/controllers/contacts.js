import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { env } from "../utils/env.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
export const getContactsController = async (req, res, next) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    const filter = parseFilterParams(req.query);

    try {
        const contacts = await getAllContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
            userId: req.user._id
        });

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
    const contact = await getContactById(contactId, req.user._id);

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

        const photo = req.file;
        let photoUrl;

        if (photo) {
            if (env('ENABLE_CLOUDINARY') === 'true') {
                photoUrl = await saveFileToCloudinary(photo);
            } else {
                photoUrl = await saveFileToUploadDir(photo);
            }
        }

        const contact = await createContact({
            name,
            phoneNumber,
            email,
            isFavourite,
            contactType,
            photo: photoUrl,
            userId: req.user._id
        });

        res.status(201).json({
            status: 201,
            message: `Successfully created a contact!`,
            data: contact,
        });
    } catch (err) {
        next(err);
    }
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const photo = req.file;

    let photoUrl;

    if (photo) {
        if (env('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const updatedContact = {
        ...req.body,
        ...(photoUrl && { photo: photoUrl }),
    };

    try {
        const result = await updateContact(contactId, req.user._id, updatedContact);

        if (!result) {
            next(createHttpError(404, 'Contact not found'));
            return;
        }

        res.json({
            status: 200,
            message: `Successfully patched a contact!`,
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId, req.user._id);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};