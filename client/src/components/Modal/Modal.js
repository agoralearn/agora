import React from 'react';
import { Modal } from 'semantic-ui-react';

function ModalComponent({ trigger, header, children, onClose }) {
  return (
    <Modal onClose={onClose} trigger={trigger} closeIcon>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default ModalComponent;
