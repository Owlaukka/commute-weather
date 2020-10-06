import React from 'react';
import { Modal, Button } from '../common';

type PreferancesModalProps = {
  closeModal: () => void;
};

const PreferancesModal = ({ closeModal }: PreferancesModalProps) => (
  <Modal closeModal={closeModal}>
    <h1>Me is a modal!</h1>
    <Button onClick={closeModal}>Close</Button>
  </Modal>
);

export default PreferancesModal;
