import React from "react";

import usePromise from "./Hook";

export default function PromiseComponent({ promiseFunction, children }) {
  const { data, isError } = usePromise(promiseFunction);
  if (data) return children(data);
  if (isError) return <div>Error</div>;
  return <div>Loading...</div>;
}
