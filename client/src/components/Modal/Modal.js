import React from 'react';
import { Modal } from 'semantic-ui-react';

function ModalComponent({ trigger, header, children }) {
  return (
    <Modal trigger={trigger} closeIcon>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default ModalComponent;
