'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by arthuranderson on 3/12/17.
 */
var defaults = require('lodash.defaults');

var DoubleNode = function () {
    function DoubleNode(obj) {
        _classCallCheck(this, DoubleNode);

        var defObj = { next: null, prev: null, data: null };
        obj = defaults(obj, defObj);
        this.next = obj.next;
        this.prev = obj.prev;
        this.data = obj.data;
    }

    _createClass(DoubleNode, null, [{
        key: 'find',
        value: function find(l, obj) {
            if (l === null) {
                return null;
            }
            if (l.data === obj) {
                return l;
            } else {
                return DoubleNode.find(l.next, obj);
            }
        }
    }, {
        key: 'insert',
        value: function insert(n, obj) {
            var node = new DoubleNode({ data: obj, next: n });
            if (n !== null) {
                if (n.prev === null) {
                    n.prev = node;
                } else {
                    n.prev.next = node;
                    n.prev = node;
                }
            }
            return node;
        }
    }, {
        key: 'append',
        value: function append(n, obj) {
            if (n === null) {
                return new DoubleNode({ data: obj });
            } else {
                var node = new DoubleNode({ prev: n, data: obj, next: n.next });
                n.next = node;
                if (node.next !== null) {
                    node.next.prev = node;
                }
                return node;
            }
        }
    }, {
        key: 'predecessor',
        value: function predecessor(n, obj) {
            var next = DoubleNode.find(n, obj);
            return next.prev;
        }
    }, {
        key: 'remove',
        value: function remove(l, obj) {
            var p = DoubleNode.find(l, obj);
            if (p !== null) {
                // removing the node we found!
                if (p === l) {
                    if (p.prev === null) {
                        l = p.next;
                    } else if (p.next === null) {
                        l = p.prev;
                    }
                }
                // p next and prev needs to be relinked
                if (p.prev !== null) {
                    p.prev.next = p.next;
                }
                if (p.next !== null) {
                    p.next.prev = p.prev;
                }
            }
            return l;
        }
    }, {
        key: 'size',
        value: function size(l) {
            var count = 0;
            for (var cur = l; cur !== null; cur = cur.next) {
                count++;
            }
            return count;
        }
    }]);

    return DoubleNode;
}();

;

module.exports = DoubleNode;