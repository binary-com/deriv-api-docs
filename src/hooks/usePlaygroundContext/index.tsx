import { PlaygroundContext } from '@site/src/contexts/playground/playground.context';
import { useContext } from 'react';

const usePlaygroundContext = () => {
  return useContext(PlaygroundContext);
};

export default usePlaygroundContext;
