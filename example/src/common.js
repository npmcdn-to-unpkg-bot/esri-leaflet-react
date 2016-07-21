import _STORE from './_store.js';

export function updateStatus (status) {
  _STORE.lastStatus = _STORE.appStatus;
  _STORE.appStatus = status;
  return true;
};
