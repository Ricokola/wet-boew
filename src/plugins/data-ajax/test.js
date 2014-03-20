/**
 * @title data-ajax Plugin Unit Tests
 * @overview Test the data-ajax plugin behaviour
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @patheard
 */
/* global jQuery, describe, it, expect, before, after, sinon */
/* jshint unused:vars */
(function( $, wb ) {

/*
 * Create a suite of related test cases using `describe`. Test suites can also be
 * nested in other test suites if you want to use the same setup `before()` and
 * teardown `after()` for more than one test suite (as is the case below.)
 */
describe( "data-ajax test suite", function() {
	var spy,
		sandbox = sinon.sandbox.create(),
		createElm = function( type, done ) {
			var $elm = $( "<div data-ajax-" + type + "='ajax/data-ajax-extra-en.html'>" );
			$elm
				.appendTo( wb.doc.find( "body" ) )
				.trigger( "wb-init.wb-ajax" )
				.on( "ajax-fetched.wb", function() {
					if ( typeof done === "function" ) {
						done();
					}
				});
			return $elm;
		};

	/*
	 * Before beginning the test suite, this function is executed once.
	 */
	before(function() {
		// Spy on jQuery's trigger method to see how it's called during the plugin's initialization
		spy = sandbox.spy( $.prototype, "trigger" );
	});

	/*
	 * After finishing the test suite, this function is executed once.
	 */
	after(function() {
		// Restore the original behaviour of trigger once the tests are finished
		sandbox.restore();
	});

	/*
	 * Test the initialization events of the plugin
	 */
	describe( "init events", function() {
		var $elm;

		before(function() {
			$elm = createElm( "replace" );
		});

		after(function() {
			$elm.remove();
		});

		it( "should trigger an ajax-fetch.wb event", function() {
			var arg,
				len = spy.args.length,
				isEvent = false;
			while ( len-- && !isEvent ) {
				arg = spy.args[len][0];
				isEvent = typeof arg === "object" && arg.type === "ajax-fetch.wb";
			}
			expect( isEvent ).to.equal( true );
		});
	});

	/*
	 * Test data-ajax-before
	 */
	describe( "data-ajax-before", function() {
		var $elm, $before;

		before(function( done ) {
			$elm = createElm( "before", done );
		});

		after(function() {
			$elm.remove();
			$before.remove();
		});

		it( "should add the .wb-ajaxbefore-inited class", function() {
			expect( $elm.hasClass( "wb-ajaxbefore-inited" ) ).to.equal( true );
		});

		it( "should load an element before itself", function() {
			$before = $elm.prev( ".ajaxed-in" );
			expect( $before.length ).to.be.greaterThan( 0 );
			expect( $before.children().length ).to.be.greaterThan( 0 );
		});
	});

	/*
	 * Test data-ajax-after
	 */
	describe( "data-ajax-after", function() {
		var $elm, $after;

		before(function( done ) {
			$elm = createElm( "after", done );
		});

		after(function() {
			$elm.remove();
			$after.remove();
		});

		it( "should add the .wb-ajaxafter-inited class", function() {
			expect( $elm.hasClass( "wb-ajaxafter-inited" ) ).to.equal( true );
		});

		it( "should load an element after itself", function() {
			$after = $elm.next( ".ajaxed-in" );
			expect( $after.length ).to.be.greaterThan( 0 );
			expect( $after.children().length ).to.be.greaterThan( 0 );
		});
	});

	/*
	 * Test data-ajax-replace
	 */
	describe( "data-ajax-replace", function() {
		var $elm;

		before(function( done ) {
			$elm = createElm( "replace", done );
		});

		after(function() {
			$elm.remove();
		});

		it( "should add the .wb-ajaxreplace-inited class", function() {
			expect( $elm.hasClass( "wb-ajaxreplace-inited" ) ).to.equal( true );
		});

		it( "should replace its content", function() {
			var $replace = $elm.find( ".ajaxed-in" );
			expect( $elm.children().first()[0] ).to.equal( $replace[0] );
			expect( $replace.length ).to.be.greaterThan( 0 );
			expect( $replace.children().length ).to.be.greaterThan( 0 );
		});
	});

	/*
	 * Test data-ajax-prepend
	 */
	describe( "data-ajax-prepend", function() {
		var $elm;

		before(function( done ) {
			$elm = createElm( "prepend", done );
		});

		after(function() {
			$elm.remove();
		});

		it( "should add the .wb-ajaxprepend-inited class", function() {
			expect( $elm.hasClass( "wb-ajaxprepend-inited" ) ).to.equal( true );
		});

		it( "should prepend to its content", function() {
			var $prepend = $elm.find( ".ajaxed-in" );
			expect( $elm.children().first()[0] ).to.equal( $prepend[0] );
			expect( $prepend.length ).to.be.greaterThan( 0 );
			expect( $prepend.children().length ).to.be.greaterThan( 0 );
		});
	});

	/*
	 * Test data-ajax-append
	 */
	describe( "data-ajax-append", function() {
		var $elm;

		before(function( done ) {
			$elm = createElm( "append", done );
		});

		after(function() {
			$elm.remove();
		});

		it( "should add the .wb-ajaxprepend-inited class", function() {
			expect( $elm.hasClass( "wb-ajaxappend-inited" ) ).to.equal( true );
		});

		it( "should append to its content", function() {
			var $append = $elm.find( ".ajaxed-in" );
			expect( $elm.children().last()[0] ).to.equal( $append[0] );
			expect( $append.length ).to.be.greaterThan( 0 );
			expect( $append.children().length ).to.be.greaterThan( 0 );
		});
	});
});

}( jQuery, wb ));