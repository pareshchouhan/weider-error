/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `Utility worker response to ${data}`;
  postMessage(response);
});
