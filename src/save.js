import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { selectedPostTitle, selectedPostURL } = attributes;
	const blockProps = useBlockProps.save({
		className: "dmg-read-more",
	});
	return (
		<p {...blockProps}>
			{selectedPostTitle && selectedPostURL && (
				<a href={selectedPostURL} target="_blank" rel="noopener noreferrer">
					Read More: {selectedPostTitle}
				</a>
			)}
		</p>
	);
}
