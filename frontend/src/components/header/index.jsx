import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import MenuButton from './menu/MenuButton';

const Header = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unlistenToHistory = history.listen(() => {
      setOpen(false);
    });

    return unlistenToHistory;
  }, []);

  return (
    <nav>
      <MenuButton open={open} setOpen={setOpen} />
    </nav>
  );
};

export default Header;
