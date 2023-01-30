import React from 'react';
import { useAppManagerContext } from '@site/src/contexts/AppManager.context';

export default function RegisteredAppTabs() {
  const { setManagerState } = useAppManagerContext();
  return (
    <div className='registered-apps-tabs'>
      <button
        onClick={() => setManagerState('REGISTER_STATE')}
        id='register_button'
        className='register-button'
      >
        <label>Register your application</label>
      </button>
      <button
        onClick={() => setManagerState('MANAGE_STATE')}
        id='manage_button'
        className='manage-button'
      >
        <label>Manage existing applications</label>
      </button>
    </div>
  );
}
