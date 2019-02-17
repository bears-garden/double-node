"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Created by arthuranderson on 3/12/17.
 */
var defaults = require("lodash.defaults");

var isFunction = require("lodash.isfunction");
/**
 * Default Comparer
 * @param l
 * @param r
 * @returns {boolean}
 */


function defComparer(l, r) {
  return l === r;
}

var DoubleNode =
/*#__PURE__*/
function () {
  function DoubleNode(obj) {
    _classCallCheck(this, DoubleNode);

    var defObj = {
      next: null,
      prev: null,
      data: null
    };
    obj = defaults(obj, defObj);
    this.next = obj.next;
    this.prev = obj.prev;
    this.data = obj.data;
  }

  _createClass(DoubleNode, null, [{
    key: "create_node",

    /**
     * create_node - A Factory method for creating DoubleNode
     * @param obj - is the data that will be stored, this node is not linked
     * @returns {DoubleNode} a new double node
     */
    value: function create_node(obj) {
      return new DoubleNode({
        data: obj
      });
    }
    /**
     * find_node - helper method to find an object using a comparer
     * @param head - a node to start the find from
     * @param obj - contains data to find the node
     * @param comparer - [optional] default method( right, left ) => { return right === left; }
     * @returns {DoubleNode}
     */

  }, {
    key: "find_node",
    value: function find_node(head, obj, comparer) {
      comparer = isFunction(comparer) ? comparer : defComparer;

      if (head === null) {
        return null;
      }

      var cur = head;

      while (cur !== null) {
        if (comparer(obj, cur.data)) {
          break;
        }

        cur = cur.next;
      }

      return cur;
    }
  }, {
    key: "insert",

    /**
     * insert - helper to create a new node with the obj data and prepends the node
     * @param head - starting node to prepend
     * @param obj - data to store
     * @returns {DoubleNode}
     */
    value: function insert(head, obj) {
      var node = DoubleNode.create_node(obj);
      return DoubleNode.insert_node(head, node);
    }
  }, {
    key: "insert_node",

    /**
     * insert_node - prepend a node to the head
     * @param head - {DoubleNode} to prepended
     * @param node - {DoubleNode} to insert - assuming a new node
     * @returns {DoubleNode} node
     */
    value: function insert_node(head, node) {
      if (!(node instanceof DoubleNode)) {
        throw new TypeError("expecting node to be DoubleNode");
      }

      node.next = head;

      if (head !== null) {
        if (head.prev === null) {
          head.prev = node;
        } else {
          head.prev.next = node;
          head.prev = node;
        }
      }

      return node;
    }
    /**
     * append -  creates a new node with obj as data and appends cur_node
     * @param cur_node - {DoubleNode} appends obj new node
     * @param obj - data to create new {DoubleNode} with
     * @returns {DoubleNode}
     */

  }, {
    key: "append",
    value: function append(cur_node, obj) {
      if (cur_node === null) {
        return DoubleNode.create_node(obj);
      } else {
        var node = DoubleNode.create_node(obj);
        return DoubleNode.append_node(cur_node, node);
      }
    }
  }, {
    key: "append_node",

    /**
     * append_node - helper to update links when appending a node
     * @param cur_node - {DoubleNode}
     * @param node - {DoubleNode}
     * @returns {DoubleNode} node
     */
    value: function append_node(cur_node, node) {
      if (!(node instanceof DoubleNode)) {
        throw new TypeError("expecting node to be DoubleNode");
      }

      if (cur_node === null) {
        return node;
      }

      node.next = cur_node.next;
      node.prev = cur_node;
      cur_node.next = node;

      if (node.next !== null) {
        node.next.prev = node;
      }

      return node;
    }
  }, {
    key: "predecessor",

    /**
     * predecessor - finds the node from head and returns its predecessor
     * @param head
     * @param obj
     * @param comparer -
     * @returns {DoubleNode}
     */
    value: function predecessor(head, obj, comparer) {
      var node = DoubleNode.find_node(head, obj, comparer);
      return DoubleNode.predecessor_node(head, node);
    }
  }, {
    key: "predecessor_node",

    /**
     * predecessor_node - returns the nodes predecessor ( same signature as single-node )
     * @param head
     * @param node
     * @returns {DoubleNode}
     */
    value: function predecessor_node(head, node) {
      if (node === null) {
        return null;
      }

      return node.prev;
    }
  }, {
    key: "remove",

    /**
     * remove - finds a node with obj's data using [optional] comparer or default comparer
     * @param cur_node - {DoubleNode} start the find from here
     * @param obj - obj data to find the node
     * @param comparer - [optional] customer comparer ( l, r ) => { l === r; }
     * @returns {DoubleNode}
     */
    value: function remove(cur_node, obj, comparer) {
      var node = DoubleNode.find_node(cur_node, obj, comparer);
      return DoubleNode.remove_node(cur_node, node);
    }
  }, {
    key: "remove_node",

    /**
     * remove_node - manages the relinking process with cur_node
     * @param cur_node - {DoubleNode}
     * @param node - {DoubleNode}
     * @returns {DoubleNode}
     */
    value: function remove_node(cur_node, node) {
      if (node === null) {
        return cur_node;
      } // removing the node we found!


      if (node === cur_node) {
        if (node.prev === null) {
          cur_node = node.next;
        } else if (node.next === null) {
          cur_node = node.prev;
        }
      }

      if (node.prev !== null) {
        node.prev.next = node.next;
      }

      if (node.next !== null) {
        node.next.prev = node.prev;
      }

      return cur_node;
    }
  }, {
    key: "size",

    /**
     * size - returns the number of nodes linked together from head
     * @param head
     * @returns {number}
     */
    value: function size(head) {
      var count = 0;

      for (var cur = head; cur !== null; cur = cur.next) {
        count++;
      }

      return count;
    }
  }, {
    key: "toArray",

    /**
     * toArray - creates an Array from the list's data
     * @param head - {DoubleNode} start of the list to
     * @returns {Array}
     */
    value: function toArray(head) {
      var len = DoubleNode.size(head);
      var arr = new Array(len);

      for (var cur = head, idx = 0; cur !== null; cur = cur.next) {
        arr[idx++] = cur.data;
      }

      return arr;
    }
  }, {
    key: "debugArray",
    value: function debugArray(head) {
      for (var cur = head, idx = 0; cur !== null; cur = cur.next) {
        console.log("[ " + idx++ + ", " + JSON.stringify(cur.data) + " ]");
      }
    }
  }]);

  return DoubleNode;
}();

;
module.exports = DoubleNode;