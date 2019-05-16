import React, { useState, useEffect } from "react";

export function usePromiseComponent(promiseFunction) {
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

export default function PromiseComponent({ promiseFunction, children }) {
  const { data, isError } = usePromiseComponent(promiseFunction);
  if (data) return children(data);
  if (isError) return <div>Error</div>;
  return <div>Loading...</div>;
}
