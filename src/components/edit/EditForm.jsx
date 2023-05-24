import React from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from 'components/db/config';

const pattern = /^\+380\d{9}$/;

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required().matches(pattern, 'Set number in format +380XXXXXXX '),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
});

const EditForm = ({ contacts, id, setIsModal, setDataForRender }) => {
    const editContact = contacts.find((e) => e.id === id);
    const initialValues = {
        name: editContact.name,
        lastName: editContact.lastName,
        email: editContact.email,
        phone: editContact.phone,
        dateOfBirth: editContact.dateOfBirth,
    };
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const contact = doc(db, 'contacts', id);
            await updateDoc(contact, values);
            setDataForRender((prevData) => {
                const updatedData = prevData.map((e) => {
                    if (e.id === id) {
                        return values;
                    }
                    return e;
                });
                return updatedData;
            });
            setIsModal(false);
        } catch (error) {
            console.log(error.massage);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                {({ isValid }) => (
                    <Form className="grid gap-0 row-gap-3 text-center">
                        <label className="form-label p-2 g-col-6 position-relative" htmlFor="name">
                            Name
                            <Field
                                className="form-control mt-1 "
                                type="text"
                                name="name"
                                placeholder="Name"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="position-absolute error-message"
                            />
                        </label>
                        <label className="form-label p-2 g-col-6" htmlFor="lastName">
                            Last Name
                            <Field
                                className="form-control mt-1"
                                type="text"
                                name="lastName"
                                placeholder="Last Nameame"
                            />
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="position-absolute error-message"
                            />
                        </label>
                        <label className="form-label p-2 g-col-6" htmlFor="email">
                            Email
                            <Field
                                className="form-control mt-1"
                                type="email"
                                name="email"
                                placeholder="email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="position-absolute error-message"
                            />
                        </label>
                        <label className="form-label p-2 g-col-6" htmlFor="phone">
                            Phone Number
                            <Field
                                className="form-control mt-1"
                                type="tel"
                                name="phone"
                                placeholder="+380 (XX) XXX-XX-XX"
                            />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="position-absolute error-message"
                            />
                        </label>
                        <label className="form-label p-2 g-col-6" htmlFor="dateOfBirth">
                            Date of Birth
                            <Field
                                className="form-control mt-1"
                                type="date"
                                name="dateOfBirth"
                                placeholder="Date"
                            />
                            <ErrorMessage
                                name="dateOfBirth"
                                component="div"
                                className="position-absolute error-message"
                            />
                        </label>

                        <button
                            className="p-2 g-col-6 btn btn-primary ms-3"
                            type="submit"
                            disabled={!isValid}
                        >
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default EditForm;
