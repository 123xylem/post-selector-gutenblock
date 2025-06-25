<?php

/**
 * Plugin Name:       DMG Read More
 * Description:       A Gutenberg block for selecting published posts as stylized "Read More" links.
 * Version:           1.1.0
 * Author:            Chris Cullen
 * Text Domain:       dmg-read-more
 *
 * @package DMGReadMore
 */

if (!defined('ABSPATH')) {
	exit;
}

function create_block_dmg_read_more_block_init()
{
	// unregister_block_type('dmg/read-more');
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_dmg_read_more_block_init');

function register_custom_meta()
{
	register_post_meta('post', 'has_post_selector', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
		'default' => '',
	));
}
add_action('init', 'register_custom_meta');

require_once plugin_dir_path(__FILE__) . 'post-finder-cli.php';
