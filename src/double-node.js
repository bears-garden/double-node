/**
 * Created by arthuranderson on 3/12/17.
 */
const defaults = require('lodash.defaults');

class DoubleNode{
    constructor( obj ){
        let defObj = { next: null, prev: null, data:null};
        obj = defaults( obj, defObj );
        this.next = obj.next;
        this.prev = obj.prev;
        this.data = obj.data;
    };

    static find(l, obj ){
        if( l === null ){
            return null;
        }
        if( l.data === obj ){
            return l;
        }else{
            return DoubleNode.find( l.next, obj );
        }
    };

    static insert(n, obj ){
        let node = new DoubleNode( { data: obj, next: n } );
        if( n !== null) {
            if (n.prev === null) {
                n.prev = node;
            } else {
                n.prev.next = node;
                n.prev = node;
            }
        }
        return node;
    };

    static append(n, obj ){
        if( n === null ){
            return new DoubleNode( { data: obj } );
        }else{
            let node = new DoubleNode({prev:n, data:obj, next: n.next} );
            n.next = node;
            if( node.next !== null ) {
                node.next.prev = node;
            }
            return node;
        }
    }

    static predecessor( n, obj ){
        let next = DoubleNode.find(n,obj);
        return next.prev;
    };

    static remove(l, obj ){
        let p = DoubleNode.find( l, obj );
        if( p !== null ){
            // removing the node we found!
            if( p === l) {
                if (p.prev === null) {
                    l = p.next;
                }else if( p.next === null ){
                    l = p.prev;
                }
            }
            // p next and prev needs to be relinked
            if( p.prev !== null ){
                p.prev.next = p.next;
            }
            if( p.next !== null ){
                p.next.prev = p.prev;
            }
        }
        return l;
    };

    static size( l ){
        let count = 0;
        for( let cur = l; cur !== null; cur = cur.next ){
            count++;
        }
        return count;
    };
};

module.exports = DoubleNode;
