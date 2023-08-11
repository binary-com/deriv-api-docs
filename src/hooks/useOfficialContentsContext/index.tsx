import { useContext } from 'react';
import { OfficialContentsContext } from '@site/src/contexts/official-contents/official-contents.context';

const useOfficialContentsContext = () => {
  return useContext(OfficialContentsContext);
};

export default useOfficialContentsContext;
