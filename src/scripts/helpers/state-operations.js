/**
 * Node corresponds to a node of state's tree.
 * @constructor
 */
function Node() {
  this.children = {};
}

/**
 * Tree corresponds to state's tree. It is used to avoid of duplicate copies of immutable state.
 * Each node signals that the corresponded state's object was already copied.
 * @constructor
 */
function Tree() {
  this.root = new Node(null);
}

Node.prototype.getChild = function(name) {
  return this.children[name];
};

Node.prototype.addChild = function(nodeName) {
  return this.children[nodeName] = new Node();
};

Tree.prototype.getRoot = function() {
  return this.root;
};

Tree.prototype.addNode = function(parentNode, nodeName) {
  return parentNode.getChild(nodeName) || parentNode.addChild(nodeName);
};

/**
 * Freezes state recursively.
 * @param {object} obj - object to be frozen. Only array, simple object and primitives are allowed.
 * @param {boolean} traverseFrozen - flag to traverse found frozen object recursively. If false then found frozen objects
 * will be ignored (for performance optimization).
 * @returns {object} - frozen object.
 */
function deepFreeze(obj, traverseFrozen = false) {
  (function freeze(obj) {
    let props = null;
    if (obj instanceof Array) {
      props = obj;
    } else if (obj instanceof Object && obj !== null) {
      props = Object.keys(obj).map(key => obj[key]);
    }
    if (props) {
      Object.freeze(obj);
      props.forEach(prop => {
        if (prop instanceof Object && prop !== null) {
          if (Object.isFrozen(prop) && traverseFrozen)
            return; //throw Error('Object is already frozen: ', prop);
          freeze(prop);
        }
      });
    }
  })(obj);

  return obj;
}

/**
 * Creates a new state with inserted value into path. State is immutable.
 * @param {Object} state - state object.
 * @param {string} propPath - path to props need to be changed.
 * @param {*} value - value need to be inserted in state with strProp path.
 * @param {typeof Tree|null} [savedPropsTree=null] - is used for several calls of function to avoid duplicate copying of state.
 * @returns {Object} - new State with value inserted into strProp path (or the origin state when strProp is wrong).
 * @example
 * let state = {
 *   prop1: {
 *     prop2: {
 *       'prop-3': [0, 1, 2]
 *     }
 *   },
 *   otherProps: {}
 * }
 * // returns
 * // {
 * //   prop1: {
 * //     prop2: {
 * //       'prop-3': [0, 1, 2222]
 * //     }
 * //   },
 * //   otherProps: {}
 * // }
 * setStateValue(state, 'prop1.prop2[prop-3][2]', 2222);
 */
function setStateValue(state, propPath, value, savedPropsTree = null) {
  'strict mode';
  const props = propPath.split(/\.|\[|\]/).filter(prop => prop !== '');
  const depth = props.length;
  let node = savedPropsTree ? savedPropsTree.getRoot() : null;

  function shallowCopy(obj) {
    return obj instanceof Array ? [...obj] : {...obj};
  }

  function createStateTree(parentProp, inx) {
    const propName = props[inx];
    let newParentProp;
    if (inx < depth - 1 && (typeof parentProp !== 'object' || parentProp === null)) {
      console.warn(`Cannot assign ${value} to "${propPath}". State's property ${parentProp} has "${typeof parentProp}" type but must be not null object`);
      return state;
    }
    const prop = parentProp[propName];
    if (savedPropsTree) {
      newParentProp = node.getChild(propName) ? parentProp : shallowCopy(parentProp);
      node = savedPropsTree.addNode(node, propName);
    } else {
      newParentProp = shallowCopy(parentProp);
    }
    newParentProp[propName] = inx === depth - 1 ? deepFreeze(value) : createStateTree(prop, inx + 1);
    return newParentProp;
  }

  return createStateTree(state, 0);
}

/**
 * Creates a new state with inserted values into paths. State is immutable.
 * @param {Object} state - state object.
 * @param {Array} args - list of alternated params [propPath1, value1, propPath2, value2, ...] (see setStateValue function).
 * @returns {Object} - new State with values inserted into strProp paths.
 * @example
 * let state = {
 *   prop1: {
 *     prop2: 2,
 *     prop3: {
 *       prop4: 4
 *       prop5: 5
 *     }
 *   },
 *   otherProps: 'some value'
 * }
 * // returns
 * {
 *   prop1: {
 *     prop2: 2222,
 *     prop3: {
 *       prop4: 4444
 *       prop5: 5
 *     }
 *   },
 *   otherProps: 'some value'
 * }
 * setStateValues(state, ['prop1.prop2', 2222, 'prop1.prop3.prop4', 4444]);
 */
function setStateValues(state, args) {
  const propPaths = args.filter((elem, inx) => inx % 2 === 0);
  const values = args.filter((elem, inx) => inx % 2 === 1);
  if (propPaths.length !== values.length)
    new Error('Number of propPaths must correspond to the number of values');
  const savedPropsTree = new Tree();
  let newIteratedState = state;
  for (let i = 0; i < values.length; i++) {
    newIteratedState = setStateValue(newIteratedState, propPaths[i], values[i], savedPropsTree);
  }
  return newIteratedState;
}

export {
  deepFreeze,
  setStateValue,
  setStateValues
}
