/**
 * Internal dependencies
 */
import { selectors } from '@moderntribe/events/data/blocks/venue';
import { wpData } from '@moderntribe/common/utils/globals';
import { editor } from '@moderntribe/common/data';
import { store } from '@moderntribe/common/store';
const { getState } = store;

/**
 * Synchronizes venues in the state with the meta of the post.
 *
 * @since TBD
 */
export const syncVenuesWithPost = () => {
	const currentPost = wpData.select( 'core/editor' ).getCurrentPost();
	const postId = wpData.select( 'core/editor' ).getCurrentPostId();
	const modifiedPost = {
		meta: {
			_EventVenueID: selectors.getVenuesInBlock( getState() ),
		}
	};

	wpData.dispatch( 'core' ).editEntityRecord( 'postType', editor.EVENT, postId, modifiedPost );
};