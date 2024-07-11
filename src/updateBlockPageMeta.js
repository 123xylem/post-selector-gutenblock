import { useEffect } from "@wordpress/element";
import { subscribe, select, dispatch } from "@wordpress/data";
import debounce from "lodash/debounce";

const useBlockMetaUpdate = (postId, metaKey, blockName) => {
	useEffect(() => {
		const getBlockList = () => select("core/block-editor").getBlocks();

		// Get current blocks
		const initialBlockList = getBlockList();
		const initialHasCustomBlock = initialBlockList.some(
			(block) => block.name === blockName,
		);
		//tell page editor the current meta
		dispatch("core/editor").editPost({
			meta: {
				[metaKey]: initialHasCustomBlock ? "yes" : "no",
			},
		});

		// Debounced update function to prevent maxCallStack
		const debouncedUpdateMeta = debounce((hasCustomBlock) => {
			dispatch("core/editor").editPost({
				meta: {
					[metaKey]: hasCustomBlock ? "yes" : "no",
				},
			});
		}, 300);

		const unsubscribe = subscribe(() => {
			const newBlockList = getBlockList();
			const hasCustomBlock = newBlockList.some(
				(block) => block.name === blockName,
			);

			debouncedUpdateMeta(hasCustomBlock);
		});

		return () => unsubscribe();
	}, [postId, metaKey, blockName]);
};

export default useBlockMetaUpdate;
