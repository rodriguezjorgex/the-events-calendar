<?php
/**
 * Handles registering all Assets for the Events V2 Views
 *
 * To remove a Assets:
 * tribe( 'assets' )->remove( 'asset-name' );
 *
 * @since 4.9.2
 *
 * @package Tribe\Events\Views\V2
 */
namespace Tribe\Events\Views\V2;

use Tribe__Events__Main as Plugin;
use Tribe\Events\Views\V2\Template_Bootstrap;

/**
 * Register
 *
 * @since 4.9.2
 *
 * @package Tribe\Events\Views\V2
 */
class Assets extends \tad_DI52_ServiceProvider {

	/**
	 * Key for this group of assets.
	 *
	 * @since TBD
	 *
	 * @var string
	 */
	public static $group_key = 'events-views-v2';

	/**
	 * Binds and sets up implementations.
	 *
	 * @since 4.9.2
	 */
	public function register() {
		$plugin = Plugin::instance();

		tribe_asset(
			$plugin,
			'tribe-events-calendar-views-v2',
			'views/tribe-events-v2.css',
			[ 'tribe-common-style', 'tribe-tooltipster-css' ], // @todo: check if we're including tooltips only in month view.
			'wp_enqueue_scripts',
			[
				'priority'     => 10,
				'conditionals' => [ $this, 'should_enqueue_frontend' ],
				'groups'       => [ static::$group_key ],
			]
		);

		tribe_asset(
			$plugin,
			'tribe-events-views-v2-manager',
			'views/manager.js',
			[
				'jquery',
				'tribe-common',
				'tribe-query-string',
				'underscore',
				'tribe-events-views-v2-accordion',
				'tribe-events-views-v2-view-selector',
				'tribe-events-views-v2-month-multiday-events',
				'tribe-events-views-v2-month-mobile-events',
				'tribe-events-views-v2-tooltip',
				'tribe-events-views-v2-events-bar',
			],
			'wp_enqueue_scripts',
			[
				'priority'     => 10,
				'conditionals' => [ $this, 'should_enqueue_frontend' ],
				'groups'       => [ static::$group_key ],
			]
		);

		tribe_asset(
			$plugin,
			'tribe-events-views-v2-accordion',
			'views/accordion.js',
			[ 'jquery', 'tribe-common' ],
			null,
			[
				'priority' => 10,
			]
		);

		tribe_asset(
			$plugin,
			'tribe-events-views-v2-view-selector',
			'views/view-selector.js',
			[ 'jquery', 'tribe-common' ],
			null,
			[
				'priority' => 10,
			]
		);

		tribe_asset(
			$plugin,
			'tribe-events-views-v2-month-multiday-events',
			'views/month-multiday-events.js',
			[ 'jquery', 'tribe-common' ],
			null,
			[
				'priority'     => 10,
			]
		);

		tribe_asset(
			$plugin,
			'tribe-events-views-v2-month-mobile-events',
			'views/month-mobile-events.js',
			[ 'jquery', 'tribe-common', 'tribe-events-views-v2-accordion' ],
			null,
			[
				'priority'     => 10,
			]
		);

		tribe_asset(
			$plugin,
			'tribe-events-views-v2-tooltip',
			'views/tooltip.js',
			[ 'jquery', 'tribe-common', 'tribe-tooltipster' ],
			null,
			[
				'priority'     => 10,
			]
		);

		tribe_asset(
			$plugin,
			'tribe-events-views-v2-events-bar',
			'views/events-bar.js',
			[ 'jquery', 'tribe-common' ],
			null,
			[
				'priority'     => 10,
			]
		);
	}

	/**
	 * Checks if we should enqueue frontend assets for the V2 views
	 *
	 * @since TBD
	 *
	 * @return bool
	 */
	public function should_enqueue_frontend() {

		$should_enqueue = tribe( Template_Bootstrap::class )->should_load();

		/**
		 * Allow filtering of where the base Frontend Assets will be loaded
		 *
		 * @since TBD
		 *
		 * @param bool $should_enqueue
		 */
		return apply_filters( 'tribe_events_views_v2_assets_should_enqueue_frontend', $should_enqueue );
	}
}
