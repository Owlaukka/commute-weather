import React, { useEffect, useRef } from 'react';

import Portal from '../Portal/Portal';
import { ModalBackground, ModalContent } from './Modal.sc';

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

const FOCUSABLE_ELEMENT_SELECTORS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';

const Modal = ({ closeModal, children }: ModalProps) => {
  const backgroundRef: React.MutableRefObject<HTMLDivElement | null> = useRef(
    null
  );
  const contentRef: React.MutableRefObject<HTMLDivElement | null> = useRef(
    null
  );

  // Close on outside-click
  useEffect(() => {
    if (!backgroundRef?.current) return undefined;
    const backgroundClickListener = (e: Event) => {
      if (e.target === backgroundRef.current) closeModal();
    };

    const bgElement = backgroundRef.current;
    bgElement.addEventListener('click', backgroundClickListener);
    return () => {
      bgElement.removeEventListener('click', backgroundClickListener);
    };
  }, [closeModal]);

  // Focus trapping
  useEffect(() => {
    const content = contentRef?.current;
    if (!content) return undefined;

    const focusableContent = content.querySelectorAll<HTMLElement>(
      FOCUSABLE_ELEMENT_SELECTORS
    );
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    content.focus();

    const keyDownListener = (e: KeyboardEvent) => {
      const isTabPressed = e.key === 'Tab';
      if (!isTabPressed) return;

      if (!e.shiftKey && document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      } else if (
        e.shiftKey &&
        document.activeElement === firstFocusableElement
      ) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', keyDownListener);
    return () => {
      document.removeEventListener('keydown', keyDownListener);
    };
  }, []);

  return (
    <Portal>
      <ModalBackground ref={backgroundRef}>
        <ModalContent tabIndex={0} ref={contentRef}>
          {children}
        </ModalContent>
      </ModalBackground>
    </Portal>
  );
};

export default Modal;
