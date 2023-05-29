import {useState, useEffect} from 'react';

export const useDebounce = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(()=> {

    const timeOut = setTimeout(()=>{
      setDebouncedValue(input);
    }, time);

    return ()=>{
      clearTimeout(timeOut);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[input]);


  return {
    debouncedValue,
  };
};
