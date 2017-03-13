/**
 * Created by arthuranderson on 3/12/17.
 */

describe("double-node", function() {
    "use strict";
    let DNode = require("../lib/index");

    it("#ctor defaults", function() {
        let node = new DNode();
        expect( node.next ).toEqual( null );
        expect( node.data ).toEqual( null );
        expect( node.prev ).toEqual( null );
    });

    it( "#insert null", function() {
        let l = DNode.insert(null, 1);

        expect( l.data ).toEqual( 1 );
        expect( l.prev ).toEqual( null );
        expect( l.next ).toEqual( null );
    });

    it( "#insert 2", function() {
        let l = DNode.insert(null, 1);
        l = DNode.insert( l, 2 );
        expect( l.data ).toEqual( 2 );
        expect( l.prev ).toEqual( null );
        expect( l.next.data ).toEqual( 1 );
        expect( l.next.prev ).toEqual( l );
        expect( l.next.next ).toEqual( null );
    });

    it("#insert multiple", function() {
        let l = null;
        for( let idx = 1; idx < 11; idx++ ){
            l = DNode.insert( l, idx);
        }

        let n = l;
        for( let idx = 10; idx > 0; idx--, n = n.next ){
            expect( n.data ).toEqual( idx );
        }
    });

    it( "#append null", function() {
        let l = DNode.append(null, 1);

        expect( l.data ).toEqual( 1 );
        expect( l.prev ).toEqual( null );
        expect( l.next ).toEqual( null );
    });

    it( "#append 2", function() {
        let l = DNode.append(null, 1);
        let n = DNode.append(l, 2 );

        expect( l.data ).toEqual( 1 );
        expect( l.prev ).toEqual( null );
        expect( l.next.data ).toEqual( 2 );
        expect( l.next.prev ).toEqual( l );
        expect( l.next ).toEqual( n );
        expect( n.prev ).toEqual( l );
        expect( n.next ).toEqual( null );
        expect( l.next.next ).toEqual( null );
    });

    it("#append multiple", function() {
        let l = DNode.append( null, 0 );
        let n = l;
        for( let idx = 1; idx < 11; idx++ ){
            n = DNode.append( n, idx);
        }

        n = l;
        for( let idx = 0; idx < 11; idx++, n = n.next ){
            expect( n.data ).toEqual( idx );
        }
    });

    it( "#find", function() {
        let l = DNode.insert(null, 1);
        l = DNode.insert(l, 2);

        let s = DNode.find(l, 1);
        expect( s ).toEqual( l.next );
        expect( s.data ).toEqual( 1 );
        expect( s.prev).toEqual( l );

        let s2 = DNode.find( l, 2);
        expect( s2 ).toEqual( l );
        expect( s2.data ).toEqual( l.data );
    });

    it( "#predecessor", function() {
        let l = DNode.insert(null, 1);
        l = DNode.insert(l, 2);
        l = DNode.insert(l, 3);
        l = DNode.insert(l, 4);

        let p = DNode.predecessor(l, 4);
        expect(p).toEqual(null);
        p = DNode.predecessor(l, 3);
        expect(p.data).toEqual(4);
        p = DNode.predecessor(l, 2);
        expect(p.data).toEqual(3);
        p = DNode.predecessor(l, 1);
        expect(p.data).toEqual(2);
    });

    it( "#remove", function(){
        let n1 = new DNode({data:1});
        let l = DNode.insert(n1, 2);
        l = DNode.insert(l, 3 );
        DNode.remove(l, 1);
        let count = 0;
        let node = 3;
        for( let cur = l; cur !== null; cur = cur.next ){
            expect( cur.data ).toEqual( node );
            node--;
            count++;
        }
        expect( count ).toEqual( 2 );
        DNode.remove( l, 2 );
        count = 0;
        node = 3;
        for( let cur = l; cur !== null; cur = cur.next ){
            expect( cur.data).toEqual( node );
            node--;
            count++;
        }
        expect( count).toEqual( 1 );
    });

    it( "#remove head", function(){
        let l = DNode.insert(null, 1 );
        l = DNode.insert(l, 2);
        l = DNode.insert(l, 3 );
        for( let i = 3; i > 1; i-- ){
            l = DNode.remove(l, i);
            expect( l.data ).toEqual( i - 1 );
        }
        l = DNode.remove(l, 1 );
        expect( l ).toEqual( null );
    });

    it( "#remove tail", function(){
        let l = DNode.append(null, 1 );
        let t = DNode.append(l, 2);
        t = DNode.append(t, 3 );
        for( let i = 3; i > 1; i-- ){
            t = DNode.remove(t, i);
            expect( t.data ).toEqual( i - 1 );
        }
        l = DNode.remove(l, 1 );
        expect( l ).toEqual( null );
    });

    it( "#size", function(){
        let n1 = new DNode({data:1});
        let l = DNode.insert(n1, 2);
        expect( DNode.size( l )).toEqual( 2 );
        l = DNode.insert(l, 3 );
        expect( DNode.size( l ) ).toEqual( 3 );
    });
})
