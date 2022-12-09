import { useState } from 'react';

export const useConnectWalletList = () => {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisconnect = () => {
    setLoggedIn(false);
  };

  const handleConnectKeplr = () => {
    setOpen(false); // TO DO
    setLoggedIn(true);
  };

  const handleConnectForboleX = () => {
    setOpen(false); // TO DO
    setLoggedIn(true);
  };

  const handleConnectWalletConnect = () => {
    setOpen(false); // TO DO
    setLoggedIn(true);
  };

  return {
    open,
    loggedIn,
    handleOpen,
    handleConnectKeplr,
    handleConnectForboleX,
    handleConnectWalletConnect,
    handleClose,
    handleCancel,
    handleDisconnect,
  };
};
