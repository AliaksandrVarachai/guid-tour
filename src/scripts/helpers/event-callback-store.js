/**
 * Callbacks object stores product events callbacks store.
 * It is needed because Redux Store allows to store only primitives (not functions).
 */

let callbacks = {};

// ID must be unique. Use UUID generator to guarantee that.
function put(id, cb) {
  callbacks[id] = cb
}

function pop(id) {
  if (!callbacks.hasOwnProperty(id))
    throw Error('There is no callback ID to get');
  const {[id]: cb, ...newCallbacks} = callbacks;
  callbacks = newCallbacks;
  return cb;
}

// just to control memory leaks
function getAll() {
  return callbacks;
}

export default {
  put,
  pop,
  getAll
}




