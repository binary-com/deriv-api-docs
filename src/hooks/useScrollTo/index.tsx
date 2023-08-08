import { useEffect } from 'react';

const useScrollTo = (ref, history, is_scrolling) => {
  useEffect(() => {
    if (is_scrolling) {
      const has_ref = ref && ref.current;

      if (has_ref) {
        const console_height = ref.current.scrollHeight;
        ref.current.scrollTo({ top: console_height, behavior: 'smooth' });
      }
    }
  }, [history, is_scrolling]);
};

export default useScrollTo;
