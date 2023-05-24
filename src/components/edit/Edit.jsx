import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditForm from './EditForm';
const Edit = ({ isModal, setIsModal, contacts, id, setDataForRender }) => {
    const handleClose = () => setIsModal(false);
    return (
        <Modal show={isModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditForm
                    setDataForRender={setDataForRender}
                    contacts={contacts}
                    id={id}
                    setIsModal={setIsModal}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Edit;
