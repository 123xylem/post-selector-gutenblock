import { useSelect, select, subscribe } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { useState, Fragment, useEffect } from "@wordpress/element";
import { SelectControl, PanelBody, Button } from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import useBlockMetaUpdate from "./updateBlockPageMeta";

export default function Edit({
	attributes,
	setAttributes,
	context: { postType, postId },
}) {
	const { selectedPostID, selectedPostTitle, selectedPostURL } = attributes;
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	useBlockMetaUpdate(postId, "has_post_selector", "dmg/read-more");

	const posts = useSelect(
		(select) => {
			let query;

			if (!Number(searchTerm)) {
				query = {
					status: "publish",
					per_page: 5,
					page: currentPage,
					search: searchTerm,
				};
			} else {
				//Decided not to allow searching for incomplete IDs due to performance issues - even with debouncing the search
				// const ids = Array.from({ length: 7000 }, (_, i) => i + 1)
				// .filter(id => id.toString().includes(searchTerm));

				query = {
					include: [Number(searchTerm)],
				};
			}

			return select("core").getEntityRecords("postType", "post", query);
		},
		[searchTerm, currentPage]
	);

	const handlePostChange = (postId) => {
		const selectedPost = posts.find((post) => post.id === postId);
		setAttributes({
			selectedPostID: postId,
			selectedPostTitle: selectedPost.title.rendered,
			selectedPostURL: selectedPost.link,
		});
	};

	const blockProps = useBlockProps();

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Post Selection", "dmg-read-more")}>
					<input
						placeholder="Search for posts"
						type="text"
						name="s"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1);
						}}
					/>
					{posts ? (
						<div className="postSelector">
							{posts.map((post) => (
								<div
									key={post.id}
									onClick={() => handlePostChange(post.id)}
									className="selectablePost"
								>
									{post.title.rendered}
								</div>
							))}
							{posts.length === 0 && (
								<p>{__("No posts found", "dmg-read-more")}</p>
							)}
							{posts.length > 0 && (
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginTop: "10px",
									}}
								>
									<Button
										isSecondary
										disabled={currentPage === 1}
										onClick={() =>
											setCurrentPage((prev) => Math.max(prev - 1, 1))
										}
									>
										{__("Previous", "dmg-read-more")}
									</Button>
									<Button
										isSecondary
										disabled={posts.length < 5}
										onClick={() => setCurrentPage((prev) => prev + 1)}
									>
										{__("Next", "dmg-read-more")}
									</Button>
								</div>
							)}
						</div>
					) : (
						<p>{__("No posts found", "dmg-read-more")}</p>
					)}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				{selectedPostID && (
					<p className="post-link-preview dmg-read-more">
						<a href={selectedPostURL} target="_blank" rel="noopener noreferrer">
							Read More: {selectedPostTitle}
						</a>
					</p>
				)}
			</div>
		</Fragment>
	);
}
