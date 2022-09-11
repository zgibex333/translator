import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useDebounce = <T>(
  value: T,
  delay?: number
): [T, Dispatch<SetStateAction<boolean>>] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [debounceStopped, setDebounceStopped] = useState<boolean>(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!debounceStopped) {
      timer = setTimeout(() => setDebouncedValue(value), delay || 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, setDebounceStopped];
};
