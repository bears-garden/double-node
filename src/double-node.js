/**
 * Created by arthuranderson on 3/12/17.
 */
const defaults = require("lodash.defaults");
const isFunction = require("lodash.isfunction");

/**
 * Default Comparer
 * @param l
 * @param r
 * @returns {boolean}
 */

function defComparer( l, r ){ return l === r; }

class DoubleNode{
    constructor( obj ){
        let defObj = { next: null, prev: null, data:null};
        obj = defaults( obj, defObj );
        this.next = obj.next;
        this.prev = obj.prev;
        this.data = obj.data;
    };

    /**
     * create_node - A Factory method for creating DoubleNode
     * @param obj - is the data that will be stored, this node is not linked
     * @returns {DoubleNode} a new double node
     */
    static create_node( obj ){
        return new DoubleNode({data:obj});
    }

    /**
     * find_node - helper method to find an object using a comparer
     * @param head - a node to start the find from
     * @param obj - contains data to find the node
     * @param comparer - [optional] default method( right, left ) => { return right === left; }
     * @returns {DoubleNode}
     */
    static find_node(head, obj, comparer ){
        comparer = isFunction( comparer ) ? comparer : defComparer;
        if( head === null ){
            return null;
        }
        let cur = head;
        while( cur !== null ){
            if( comparer( obj, cur.data ) ){
                break;
            }
            cur = cur.next;
        }
        return cur;
    };

    /**
     * insert - helper to create a new node with the obj data and prepends the node
     * @param head - starting node to prepend
     * @param obj - data to store
     * @returns {DoubleNode}
     */
    static insert(head, obj ){
        let node = DoubleNode.create_node( obj );
        return DoubleNode.insert_node( head, node);
    };

    /**
     * insert_node - prepend a node to the head
     * @param head - {DoubleNode} to prepended
     * @param node - {DoubleNode} to insert - assuming a new node
     * @returns {DoubleNode} node
     */
    static insert_node( head, node ){
        if( !(node instanceof DoubleNode) ){
            throw new TypeError("expecting node to be DoubleNode");
        }
        node.next = head;
        if( head !== null) {
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
    static append(cur_node, obj ){
        if( cur_node === null ){
            return DoubleNode.create_node( obj );
        }else{
            let node = DoubleNode.create_node( obj );
            return DoubleNode.append_node(cur_node, node );
        }
    };

    /**
     * append_node - helper to update links when appending a node
     * @param cur_node - {DoubleNode}
     * @param node - {DoubleNode}
     * @returns {DoubleNode} node
     */
    static append_node(cur_node, node ){
        if( !(node instanceof DoubleNode) ){
            throw new TypeError("expecting node to be DoubleNode");
        }
        if( cur_node === null ){
            return node;
        }
        node.next = cur_node.next;
        node.prev = cur_node;
        cur_node.next = node;
        if( node.next !== null ) {
            node.next.prev = node;
        }
        return node;
    };

    /**
     * predecessor - finds the node from head and returns its predecessor
     * @param head
     * @param obj
     * @param comparer -
     * @returns {DoubleNode}
     */
    static predecessor( head, obj, comparer ){
        let node = DoubleNode.find_node(head,obj, comparer);
        return DoubleNode.predecessor_node( head, node );
    };

    /**
     * predecessor_node - returns the nodes predecessor ( same signature as single-node )
     * @param head
     * @param node
     * @returns {DoubleNode}
     */
    static predecessor_node( head, node ){
        if( node === null ){
            return null;
        }
        return node.prev;
    };

    /**
     * remove - finds a node with obj's data using [optional] comparer or default comparer
     * @param cur_node - {DoubleNode} start the find from here
     * @param obj - obj data to find the node
     * @param comparer - [optional] customer comparer ( l, r ) => { l === r; }
     * @returns {DoubleNode}
     */
    static remove(cur_node, obj, comparer ){
        let node = DoubleNode.find_node( cur_node, obj, comparer );
        return DoubleNode.remove_node( cur_node, node );
    };

    /**
     * remove_node - manages the relinking process with cur_node
     * @param cur_node - {DoubleNode}
     * @param node - {DoubleNode}
     * @returns {DoubleNode}
     */
    static remove_node( cur_node, node ){
        if( node === null ) {
            return cur_node;
        }
        // removing the node we found!
        if( node === cur_node) {
            if (node.prev === null) {
                cur_node = node.next;
            }else if( node.next === null ){
                cur_node = node.prev;
            }
        }
        if( node.prev !== null ){
            node.prev.next = node.next;
        }
        if( node.next !== null ){
            node.next.prev = node.prev;
        }
        return cur_node;
    };

    /**
     * size - returns the number of nodes linked together from head
     * @param head
     * @returns {number}
     */
    static size( head ){
        let count = 0;
        for( let cur = head; cur !== null; cur = cur.next ){
            count++;
        }
        return count;
    };

    /**
     * toArray - creates an Array from the list's data
     * @param head - {DoubleNode} start of the list to
     * @returns {Array}
     */
    static toArray(head){
        let len = DoubleNode.size(head);
        let arr = new Array(len);
        for( let cur = head, idx = 0; cur !== null; cur = cur.next ){
            arr[idx++] = cur.data;
        }
        return arr;
    }

    static debugArray( head ){
        for( let cur = head, idx = 0; cur !== null; cur = cur.next ){
            console.log( "[ " + idx++ + ", " + JSON.stringify( cur.data) + " ]" );
        }
    }
};

module.exports = DoubleNode;
