import React, { Suspense, useState } from 'react';
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
  return (
    <>
      <Button
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
