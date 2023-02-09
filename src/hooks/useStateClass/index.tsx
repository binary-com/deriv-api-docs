import { useAppManagerContext } from '../useAppManagerContext';

export const useStateClass = (styles) => {
  const { manager_state } = useAppManagerContext();
  switch (manager_state) {
    case 'REGISTER_STATE':
      return styles.registerState;
    case 'MANAGE_STATE':
      return styles.manageState;
    case 'TOKEN_STATE':
      return styles.tokenState;
    case 'UPDATE_STATE':
      return styles.updateState;
    default:
      return '';
  }
};
