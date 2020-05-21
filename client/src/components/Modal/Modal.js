import React from 'react';
import { Modal } from 'semantic-ui-react';

function ModalComponent({ trigger, header, children, onClose, open }) {
  return (
    <Modal onClose={onClose} trigger={trigger} open={open}>
      <Modal.Header className='text-center'>{header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default ModalComponent;
