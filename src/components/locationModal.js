import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ModalForm from './modalForm';
import './styles/locationModal.scss';

const LocationModal = (props) => {
    const { showModal, toggleModal, isFocused, title, handleFormInput, handleDropdown, isZipValid, formData, handleAddition, save } = props;
    return (
        <Modal isOpen={showModal} toggle={toggleModal} backdrop={true} className="custom-modal location-modal">
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <ModalForm
                    isFocused={isFocused}
                    handleInput={handleFormInput}
                    handleDropdown={handleDropdown}
                    isZipValid={isZipValid}
                    formValues={formData}
                    handleAddition={handleAddition}
                />
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggleModal} className="btn-cancel">Cancel</Button>
                <Button onClick={save} className="btn-save">Save</Button>{' '}
            </ModalFooter>
        </Modal>
    )
}

export default LocationModal;