# DMG Read More Gutenberg Block

A WordPress plugin that provides a custom Gutenberg block for selecting and displaying published posts as stylized "Read More" links. This plugin includes both a frontend block editor component and a high-performance WP-CLI command for finding posts containing the block.

## Features

### Gutenberg Block

- **Post Selection**: Search and select published posts from within the block editor
- **Search Functionality**: Search posts by title or specific post ID
- **Pagination**: Browse through search results with pagination controls
- **Recent Posts**: Default display of recent posts for quick selection
- **Stylized Output**: Automatically formats selected posts as "Read More" links
- **Custom CSS Class**: Output includes `dmg-read-more` CSS class for styling
- **Real-time Preview**: See the formatted link in the editor as you select posts

### WP-CLI Command

- **High Performance**: Optimized for databases with millions of records
- **Date Range Filtering**: Search posts within specific date ranges
- **Batch Processing**: Efficiently processes large datasets in chunks
- **Meta-based Search**: Uses post meta for faster queries
- **Comprehensive Logging**: Detailed output of found post IDs

## Installation

1. **Clone or download** this repository to your WordPress plugins directory:

   ```bash
   cd wp-content/plugins/
   git clone [repository-url] dmg-read-more
   ```

2. **Install dependencies** and build the block:

   ```bash
   cd dmg-read-more
   npm install
   npm run build
   ```

3. **Activate the plugin** through the WordPress admin panel or via WP-CLI:
   ```bash
   wp plugin activate dmg-read-more
   ```

## Usage

### Using the Gutenberg Block

1. **Add the Block**: In the WordPress editor, search for "DMG Read More" and add the block to your content.

2. **Search for Posts**:

   - Use the search field in the block settings panel to find posts by title
   - Enter a specific post ID to find a particular post
   - Browse recent posts that appear by default

3. **Select a Post**: Click on any post from the search results to select it.

4. **Preview**: The selected post will appear as a "Read More" link in the editor preview.

5. **Publish**: The block will render as a paragraph with the `dmg-read-more` class containing the selected post link.

### Block Output Format

The block generates HTML in this format:

```html
<p class="dmg-read-more">
	<a href="[post-permalink]" target="_blank" rel="noopener noreferrer">
		Read More: [post-title]
	</a>
</p>
```

### WP-CLI Command Usage

The plugin includes a custom WP-CLI command for finding posts containing the DMG Read More block:

#### Basic Usage

```bash
wp dmg_read_more search
```

Searches for posts from the last 30 days that contain the DMG Read More block.

#### Date Range Filtering

```bash
# Find posts published before a specific date
wp dmg_read_more search --date-before=2024-01-01

# Find posts published after a specific date
wp dmg_read_more search --date-after=2023-01-01

# Find posts within a specific date range
wp dmg_read_more search --date-before=2024-01-01 --date-after=2023-01-01
```

#### Date Format

Dates must be provided in `YYYY-MM-DD` format (e.g., `2024-01-15`).

#### Output

The command outputs:

- Post IDs of matching posts
- Success message with total count
- Error messages if no posts found or invalid dates provided

## Development

### Building the Block

```bash
# Development mode with hot reloading
npm run start

# Production build
npm run build

# Format code
npm run format

# Lint JavaScript
npm run lint:js

# Lint CSS
npm run lint:css
```

### Project Structure

```
dmg-read-more/
├── src/
│   ├── block.json          # Block configuration
│   ├── edit.js             # Editor component
│   ├── save.js             # Frontend render component
│   ├── index.js            # Main entry point
│   ├── style.scss          # Block styles
│   └── updateBlockPageMeta.js # Meta update utility
├── build/                  # Compiled assets
├── post-selector.php       # Main plugin file
├── post-finder-cli.php     # WP-CLI command implementation
└── package.json            # Dependencies and scripts
```

### Key Components

#### Block Editor (`src/edit.js`)

- Uses WordPress core data API for post queries
- Implements search functionality with pagination
- Provides real-time preview of selected posts
- Updates post meta when block is used

#### Block Render (`src/save.js`)

- Generates the final HTML output
- Applies the `dmg-read-more` CSS class
- Creates accessible links with proper attributes

#### WP-CLI Command (`post-finder-cli.php`)

- Optimized for large databases using meta queries
- Implements batch processing for performance
- Provides comprehensive date range filtering
- Includes proper error handling and validation

## Performance Considerations

### WP-CLI Command Optimization

- Uses post meta queries instead of content searches
- Processes results in batches of 100 posts
- Disables query caching for large datasets
- Implements efficient pagination

### Block Editor Performance

- Debounced search to prevent excessive API calls
- Limited search results (5 per page)
- Direct ID lookup for specific post searches
- Efficient state management

## Customization

### Styling

The block output includes the `dmg-read-more` CSS class, allowing you to customize the appearance:

```css
.dmg-read-more {
	/* Your custom styles here */
}

.dmg-read-more a {
	/* Link styles */
}
```

### Block Attributes

The block stores these attributes:

- `selectedPostID`: The ID of the selected post
- `selectedPostTitle`: The title of the selected post
- `selectedPostURL`: The permalink of the selected post

## Requirements

- WordPress 5.0 or higher
- PHP 7.4 or higher
- Node.js 14 or higher (for development)
- WP-CLI (for command-line functionality)

## Changelog

### Version 1.1.0

- Added WP-CLI command for finding posts with the block
- Improved search functionality with pagination
- Enhanced performance optimizations
- Added comprehensive error handling

### Version 1.0.0

- Initial release with basic post selection functionality
- Gutenberg block implementation
- Search and preview capabilities
