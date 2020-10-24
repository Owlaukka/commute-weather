import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const portalRoot = document.getElementById('js-portal-root');
const el = document.createElement('div');

const Portal = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (!portalRoot) return undefined;
    portalRoot.appendChild(el);
    return () => {
      portalRoot.removeChild(el);
    };
  }, []);

  return createPortal(children, el);
};

export default Portal;
