import { useEffect, useState } from "react";

export default function usePromise(promiseFunction) {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    promiseFunction()
      .then(response => {
        setData(response);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [promiseFunction]);
  return { data, isError };
}
