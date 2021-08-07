import React, { ReactElement } from 'react';
import Modal from 'react-modal';
import logo from '../assets/logo.png';
import Button from './Button';

interface Props {
  open: boolean;
  closeHandler: () => any;
}

export default function CompanionModal({
  open,
  closeHandler,
}: Props): ReactElement {
  return (
    <Modal
      onRequestClose={closeHandler}
      className="companion-modal"
      overlayClassName="companion-overlay"
      isOpen={open}
    >
      <img src={logo} alt="" />
      <h1>Coder Companion</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
        ab doloribus atque in labore corrupti quam molestiae quas maxime, hic
      </p>
      <Button>Download</Button>
    </Modal>
  );
}
