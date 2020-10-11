import React from 'react';
import { Modal, Button } from '../common';

type PreferancesModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
};

const PreferancesModal = ({
  isModalOpen,
  closeModal,
}: PreferancesModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <Modal {...{ isModalOpen, closeModal }}>
      <form onSubmit={handleSubmit}>
        <Button onClick={closeModal}>Close</Button>
        <Button type="submit">Save</Button>
      </form>
    </Modal>
  );
};

export default PreferancesModal;
