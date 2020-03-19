/**
 * External dependencies
 */
import React, { Fragment } from 'react';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/editor';
import Controls from './controls';

/**
 * Internal dependencies
 */
import DateTimeContext from './context';
import Content from './content/container';
import './style.pcss';

/**
 * Module Code
 */

const EventDateTime = ( props ) => {
	const template = [
		[ 'tribe/event-datetime-dashboard', {} ],
		[ 'tribe/event-datetime-content', {} ],
	];

	const { isOpen, open, attributes, setAttributes } = props;

	const controlProps = {
		showTimeZone: attributes.showTimeZone,
		setShowTimeZone: value => setAttributes( { showTimeZone: value } ),
		setDateTimeAttributes: setAttributes,
	};

	const contextValue = {
		isOpen,
		open,
		timeZoneLabel: attributes.timeZoneLabel,
		setTimeZoneLabel: label => setAttributes( { timeZoneLabel: label } ),
		...controlProps,
	};

	const contentProps = {
		isOpen,
		open,
		timeZoneLabel: attributes.timeZoneLabel,
		showTimeZone: attributes.showTimeZone,
		setAttributes,
	};

	return (
		<Fragment>
			<Controls { ...props } />
			<section
				className="tribe-editor__subtitle tribe-editor__date-time tribe-common__plugin-block-hook"
			>
				<Content { ...props } />
				{/* <DateTimeContext.Provider value={ contextValue }>
					<InnerBlocks
						template={ template }
						templateLock="all"
						templateInsertUpdatesSelection={ false }
					/>
				</DateTimeContext.Provider> */}
			</section>
		</Fragment>
	);
};

export default EventDateTime;
