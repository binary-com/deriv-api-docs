import { RefObject, useEffect } from 'react';

const useClickOutsideDropdown = (
  ref: RefObject<HTMLElement>,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  new_state: boolean,
) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(new_state);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useClickOutsideDropdown;
