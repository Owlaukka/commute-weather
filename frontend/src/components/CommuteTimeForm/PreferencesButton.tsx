import React, { Suspense, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import { Button } from '../common/buttons';

const PreferencesModal = React.lazy(() => import('../PreferencesModal'));

const Loader = styled.div({
  position: 'fixed',
  top: '50%',
  left: '50%',
});

const PreferencesButton = ({ isOpen }: { isOpen: boolean }) => {
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isPreferenceModalOpen && buttonRef.current) buttonRef.current.focus();
  }, [isPreferenceModalOpen]);

  return (
    <>
      <Button
        ref={buttonRef}
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsPreferenceModalOpen(true)}
      >
        Set Preferences
      </Button>
      {isPreferenceModalOpen && (
        //  TODO: do better loader.... obviously
        <Suspense fallback={<Loader>Loading...</Loader>}>
          <PreferencesModal
            closeModal={() => setIsPreferenceModalOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
};

export default PreferencesButton;
