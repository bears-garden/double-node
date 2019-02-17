/**
 * Created by arthuranderson on 3/12/17.
 */
import DNode from '../double-node';

describe("double-node", function() {
    "use strict";

    test("#ctor defaults", function() {
        let node = new DNode();
        expect( node.next ).toEqual( null );
        expect( node.data ).toEqual( null );
        expect( node.prev ).toEqual( null );
    });

    test("#create_node", function(){
        let node = DNode.create_node();
        expect( node.next ).toEqual( null );
        expect( node.data ).toEqual( null );
        expect( node.prev ).toEqual( null );
    });

    test( "#insert null", function() {
        let head = DNode.insert(null, 1);

        expect( head.data ).toEqual( 1 );
        expect( head.prev ).toEqual( null );
        expect( head.next ).toEqual( null );
    });

    test( "#insert_node null", function() {
        let head = null;
        let node = DNode.create_node(1);
        head = DNode.insert_node(head, node);
        expect( head ).toBe(node);
        expect( head.data ).toEqual( 1 );
        expect( head.prev ).toEqual( null );
        expect( head.next ).toEqual( null );
    });

    test( "#insert 2", function() {
        let head = DNode.insert(null, 1);
        head = DNode.insert( head, 2 );
        expect( head.data ).toEqual( 2 );
        expect( head.prev ).toEqual( null );
        expect( head.next.data ).toEqual( 1 );
        expect( head.next.prev ).toEqual( head );
        expect( head.next.next ).toEqual( null );
    });

    test( "#insert_node 2", function() {
        let head = null;
        let node = DNode.create_node(1);
        head = DNode.insert_node(head, node);
        let node2 = DNode.create_node(2);
        head = DNode.insert_node( head, node2 );
        expect( head ).toEqual( node2 );
        expect( head.data ).toEqual( 2 );
        expect( head.prev ).toEqual( null );
        expect( head.next ).toEqual( node );
        expect( head.next.data ).toEqual( 1 );
        expect( head.next.prev ).toEqual( head );
        expect( head.next.next ).toEqual( null );
    });

    test("#insert multiple", function() {
        let head = null;
        for( let idx = 1; idx < 11; idx++ ){
            head = DNode.insert( head, idx);
        }

        let n = head;
        for( let idx = 10; idx > 0; idx--, n = n.next ){
            expect( n.data ).toEqual( idx );
        }
    });

    test("#insert_node multiple", function() {
        let head = null;
        let node = null;
        for( let idx = 1; idx < 11; idx++ ){
            node = DNode.create_node( idx );
            head = DNode.insert_node( head, node);
        }

        let n = head;
        for( let idx = 10; idx > 0; idx--, n = n.next ){
            expect( n.data ).toEqual( idx );
        }
    });

    test( "#append null head", function() {
        let head = DNode.append(null, 1);

        expect( head.data ).toEqual( 1 );
        expect( head.prev ).toEqual( null );
        expect( head.next ).toEqual( null );
    });

    test( "#append_node null head", function() {
        let head = null;
        let node = DNode.create_node(1);
        head = DNode.append_node(head, node);

        expect( head.data ).toEqual( node.data );
        expect( head.prev ).toEqual( null );
        expect( head.next ).toEqual( null );
    });

    test( "#append 2", function() {
        let head = DNode.append(null, 1);
        let tail = DNode.append(head, 2 );

        expect( head.data ).toEqual( 1 );
        expect( head.prev ).toEqual( null );
        expect( head.next.data ).toEqual( 2 );
        expect( head.next.prev ).toEqual( head );
        expect( head.next ).toEqual( tail );
        expect( tail.prev ).toEqual( head );
        expect( tail.next ).toEqual( null );
        expect( head.next.next ).toEqual( null );
    });

    test( "#append_node 2", function() {
        let node = DNode.create_node(1);
        let tail = DNode.append_node(null, node);
        let node2 = DNode.create_node(2);
        tail = DNode.append_node(tail, node2);

        expect( tail.data ).toEqual( 2 );
        expect( tail.next ).toEqual( null );
        expect( tail.prev ).toEqual( node );
        expect( tail.prev.data ).toEqual( 1 );
        expect( tail.prev.next ).toEqual( tail );
        expect( tail ).toEqual( node2 );
        expect( node.next ).toEqual( tail );
        expect( node.prev ).toEqual( null );
        expect( node.next.next ).toEqual( null );
    });

    test("#append multiple", function() {
        let head = DNode.append( null, 0 );
        let tail = head;
        for( let idx = 1; idx < 11; idx++ ){
            tail = DNode.append( tail, idx);
        }

        let cur = head;
        for( let idx = 0; idx < 11; idx++, cur = cur.next ){
            expect( cur.data ).toEqual( idx );
        }
    });

    test("#append_node multiple", function() {
        let head = DNode.create_node(0);
        let tail = head;
        let app_node = null;
        for( let idx = 1; idx < 11; idx++ ){
            app_node = DNode.create_node(idx);
            tail = DNode.append_node( tail, app_node);
        }

        let cur = head;
        for( let idx = 0; idx < 11; idx++, cur = cur.next ){
            expect( cur.data ).toEqual( idx );
        }
    });

    test( "#find_node", function() {
        let head = DNode.insert(null, 1);
        head = DNode.insert(head, 2);

        let found_node = DNode.find_node(head, 1);
        expect( found_node ).toEqual( head.next );
        expect( found_node.data ).toEqual( 1 );
        expect( found_node.prev).toEqual( head );

        let found_node2 = DNode.find_node( head, 2);
        expect( found_node2 ).toEqual( head );
        expect( found_node2.data ).toEqual( head.data );
    });

    function compareId( left, right ){
        return left.id === right.id;
    };

    test( "#find_node {id:1}", function() {
        let head = DNode.insert(null, {id:1});
        head = DNode.insert(head, {id:2});

        let found_node = DNode.find_node(head, {id:1}, compareId);
        expect( found_node ).toEqual( head.next );
        expect( found_node.data.id ).toEqual( 1 );
        expect( found_node.prev).toEqual( head );

        let found_node2 = DNode.find_node( head, {id:2}, compareId);
        expect( found_node2 ).toEqual( head );
        expect( found_node2.data.id ).toEqual( head.data.id );
    });

    test( "#predecessor", function() {
        let head = DNode.create_node(0);
        for( let idx = 1; idx < 10; idx++ ){
            head = DNode.insert(head, idx);
        }
        let pred = null;
        for( let idx = 0; idx < 9; idx++ ){
            pred = DNode.predecessor( head, idx);
            expect( pred.data).toEqual(idx + 1);
        }
    });

    test( "#predecessor {id:1}", function() {
        let len = 10;
        let values = new Array(len);
        for( let idx = 0; idx < len; idx++ ){
            values[idx] = {id:idx};
        }
        let head = null;
        for( let idx = 0; idx < len; idx++ ){
            head = DNode.insert(head, values[idx] );
        }

        let p = null;
        for( let idx = 0; idx < len - 1; idx++ ){
            p = DNode.predecessor(head, values[idx], compareId );
            expect(p.data.id).toEqual(values[ idx + 1 ].id);
        }
    });

    test( "#predecessor_node", function() {
        let head = DNode.create_node( 0 );
        let node = null;
        for( let idx = 1; idx < 10; idx++ ){
            node = DNode.create_node( idx );
            head = DNode.insert_node( head, node );
        }
        let found_node = null;
        let pred = null;
        for( let idx = 0; idx < 9; idx++ ){
            found_node = DNode.find_node( head, idx );
            expect( found_node instanceof DNode ).toBeTruthy();
            pred = DNode.predecessor_node(head, found_node );
            expect( pred.data ).toEqual( idx + 1);
        }
    });

    test( "#remove", function(){
        let head = DNode.create_node(1);
        head = DNode.insert(head, 2);
        head = DNode.insert(head, 3 );
        // DNode.debugArray(head);
        head = DNode.remove(head, 1);
        let idx = 3;
        for( let cur = head; cur !== null; cur = cur.next ){
            expect( cur.data ).toEqual( idx-- );
        }
        expect( DNode.size( head ) ).toEqual( 2 );
        head = DNode.remove( head, 2 );
        idx = 3;
        for( let cur = head; cur !== null; cur = cur.next ){
            expect( cur.data).toEqual( idx-- );
        }
        expect( DNode.size(head) ).toEqual( 1 );
    });

    test( "#remove_node", function(){
        let head = DNode.create_node(1);
        head = DNode.insert(head, 2);
        head = DNode.insert(head, 3 );
        let found = DNode.find_node( head, 1 );
        head = DNode.remove_node(head, found);
        let idx = 3;
        for( let cur = head; cur !== null; cur = cur.next ){
            expect( cur.data ).toEqual( idx-- );
        }
        expect( DNode.size( head ) ).toEqual( 2 );
        found = DNode.find_node(head, 2);
        head = DNode.remove_node(head, found );
        idx = 3;
        for( let cur = head; cur !== null; cur = cur.next ){
            expect( cur.data).toEqual( idx-- );
        }
        expect( DNode.size(head) ).toEqual( 1 );
    });

    test( "#remove head", function(){
        let head = DNode.create_node( 1 );
        head = DNode.insert(head, 2);
        head = DNode.insert(head, 3 );
        // DNode.debugArray( head );
        for( let i = 3; i > 1; i-- ){
            head = DNode.remove(head, i);
            expect( head.data ).toEqual( i - 1 );
        }
        head = DNode.remove(head, 1 );
        expect( head ).toEqual( null );
    });

    test( "#remove_node head", function(){
        let head = DNode.create_node( 1 );
        head = DNode.insert(head, 2);
        head = DNode.insert(head, 3 );
        // DNode.debugArray( head );
        let found = null;
        for( let i = 3; i > 1; i-- ){
            found = DNode.find_node(head, i );
            head = DNode.remove_node(head, found);
            expect( head.data ).toEqual( i - 1 );
        }
        found = DNode.find_node(head, 1);
        head = DNode.remove_node(head, found);
        expect( head ).toEqual( null );
    });

    test( "#remove tail", function(){
        let head = DNode.append(null, 1 );
        let tail = DNode.append(head, 2);
        tail = DNode.append(tail, 3 );
        for( let i = 3; i > 1; i-- ){
            tail = DNode.remove(tail, i);
            expect( tail.data ).toEqual( i - 1 );
        }
        head = DNode.remove(head, 1 );
        expect( head ).toEqual( null );
    });

    test( "#remove_node tail", function(){
        let head = DNode.append(null, 1 );
        let tail = DNode.append(head, 2);
        tail = DNode.append(tail, 3 );
        let found = null;
        for( let i = 3; i > 1; i-- ){
            found = DNode.find_node( tail, i );
            tail = DNode.remove_node(tail, found);
            expect( tail.data ).toEqual( i - 1 );
        }
        expect( tail ).toEqual( head );
        found = DNode.find_node(head, 1);
        head = DNode.remove_node(head, found );
        expect( head ).toEqual( null );
    });

    test( "#remove middle", function(){
        let head = DNode.create_node( 1 );
        let tail = DNode.append(head, 2);
        tail = DNode.append(tail, 3 );
        head = DNode.remove(head, 2 );
        expect( DNode.size( head) ).toEqual(2);
    });

    test( "#remove_node middle", function(){
        let head = DNode.create_node( 1 );
        let tail = head;
        for( let idx = 2; idx < 11; idx++ ){
            tail = DNode.append( tail, idx);
        }
        let found = DNode.find_node( head, 5 );
        head = DNode.remove_node(head, found );
        expect( DNode.size( head) ).toEqual(9);
    });

    test( "#size", function(){
        let head = DNode.create_node(1);
        head = DNode.insert(head, 2);
        expect( DNode.size( head )).toEqual( 2 );
        head = DNode.insert(head, 3 );
        expect( DNode.size( head ) ).toEqual( 3 );
    });
})
