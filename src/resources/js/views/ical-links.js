/**
 * Makes sure we have all the required levels on the Tribe Object
 *
 * @since TBD
 *
 * @type   {PlainObject}
 */
 tribe.events = tribe.events || {};
 tribe.events.views = tribe.events.views || {};

 /**
  * Configures Views Object in the Global Tribe variable
  *
  * @since TBD
  *
  * @type   {PlainObject}
  */
 tribe.events.views.icalLinks = {};

 /**
  * Initializes in a Strict env the code that manages the Event Views
  *
  * @since TBD
  *
  * @param  {PlainObject} $   jQuery
  * @param  {PlainObject} obj tribe.events.views.icalLinks
  *
  * @return {void}
  */
 ( function( $, obj ) {
	'use strict';

	/**
	 * Selectors used for configuration and setup
	 *
	 * @since TBD
	 *
	 * @type {PlainObject}
	 */
	obj.selectors = {
		icalLinks: '.tribe-events-c-subscribe-dropdown',
		icalLinksButton: '.tribe-events-c-subscribe-dropdown__button',
		icalLinksButtonActiveClass: 'tribe-events-c-subscribe-dropdown__button--active',
		icalLinksListContainer: 'tribe-events-c-subscribe-dropdown__content',
	};

	/**
	 * Toggles active class on view selector button
	 *
	 * @since TBD
	 *
	 * @param {Event} event event object for click event
	 *
	 * @return {void}
	 */
	obj.handleIcalLinksButtonClick = function( event ) {
		console.log('handleIcalLinksButtonClick');
		console.log( event.target );
		$( event.target ).toggleClass( obj.selectors.icalLinksButtonActiveClass );
	};

	/**
	 * Binds events for container
	 *
	 * @since TBD
	 *
	 * @param  {jQuery} $container jQuery object of view container
	 *
	 * @return {void}
	 */
	obj.bindEvents = function( $container ) {
		console.log('bindEvents');
		var $icalLinksButton = $container.find( obj.selectors.icalLinksButton );

		$( document ).on(
			'click focus focus-within',
			obj.selectors.icalLinksButton,
			obj.handleIcalLinksButtonClick
		);
	};
	/**
	 * Unbinds events for container
	 *
	 * @since  4.9.7
	 *
	 * @param  {jQuery}  $container jQuery object of view container
	 *
	 * @return {void}
	 */
	obj.unbindEvents = function( $container ) {
		$container
			.find( obj.selectors.icalLinksButton )
			.off( 'click', obj.handleIcalLinksButtonClick );
	};

	/**
	 * Deinitialize ical links JS
	 *
	 * @since TBD
	 *
	 * @param  {Event}       event    event object for 'beforeAjaxSuccess.tribeEvents' event
	 * @param  {jqXHR}       jqXHR    Request object
	 * @param  {PlainObject} settings Settings that this request was made with
	 *
	 * @return {void}
	 */
	obj.deinit = function( event, jqXHR, settings ) { // eslint-disable-line no-unused-vars
		var $container = event.data.container;
		obj.unbindEvents( $container );
		$container.off( 'beforeAjaxSuccess.tribeEvents', obj.deinit );
	};

	/**
	 * Initialize view selector JS
	 *
	 * @since TBD
	 *
	 * @param  {Event}   event      event object for 'afterSetup.tribeEvents' event
	 * @param  {integer} index      jQuery.each index param from 'afterSetup.tribeEvents' event
	 * @param  {jQuery}  $container jQuery object of links container
	 * @param  {object}  data       data object passed from 'afterSetup.tribeEvents' event
	 *
	 * @return {void}
	 */
	obj.init = function( event, index, $container, data ) { // eslint-disable-line no-unused-vars
		console.log('init');
		var $icalLinks = $container.find( obj.selectors.icalLinks );

		if ( ! $icalLinks.length ) {
			console.log('no links!');
			return;
		}

		obj.bindEvents( $container );
		$container.on( 'beforeAjaxSuccess.tribeEvents', { container: $container }, obj.deinit );
	};

	/**
	 * Handles the initialization of the view selector when Document is ready
	 *
	 * @since TBD
	 *
	 * @return {void}
	 */
	obj.ready = function() {
		$( document ).on(
			'afterSetup.tribeEvents',
			obj.init
		);
	};

	// Configure on document ready
	$( obj.ready );

} )( jQuery, tribe.events.views.icalLinks );
