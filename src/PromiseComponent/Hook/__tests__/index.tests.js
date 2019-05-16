import React from "react";
import { mount } from "enzyme";

import { act } from "react-dom/test-utils";
import usePromise from "..";

export function hookResponse(callHook, onCallback) {
  const Wrapper = ({ children, callHook }) => children(callHook());
  const returnVal = {};

  let element = mount(
    <Wrapper callHook={callHook}>
      {val => {
        returnVal.response = val;
        return null;
      }}
    </Wrapper>
  );

  act(() => {
    setImmediate(() => {
      element.update();
      onCallback(returnVal.response);
    });
  });
}

it("returns initial state", done => {
  const myPromise = () => new Promise(() => {});
  hookResponse(
    () => usePromise(myPromise),
    response => {
      const { data, isError } = response;
      expect(data).toEqual(undefined);
      expect(isError).toBeFalsy();
      done();
    }
  );
});

it("returns correct data if successful", done => {
  const myPromise = () => Promise.resolve("foo");
  hookResponse(
    () => usePromise(myPromise),
    response => {
      const { data, isError } = response;
      expect(data).toEqual("foo");
      expect(isError).toBeFalsy();
      done();
    }
  );
});

it("returns isError true if fails", done => {
  const myPromise = () => Promise.reject();
  hookResponse(
    () => usePromise(myPromise),
    response => {
      expect(response.data).toEqual(undefined);
      expect(response.isError).toBeTruthy();
      done();
    }
  );
});
