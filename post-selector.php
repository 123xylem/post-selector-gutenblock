<?php

/**
 * Plugin Name:       Post Selector
 * Description:       Select published posts for DMG.
 * Version:           1.1.0
 * Author:            Chris Cullen
 * Text Domain:       dmg-plugin
 *
 * @package CreateBlock
 */

if (!defined('ABSPATH')) {
	exit;
}

function create_block_post_selector_block_init()
{
	// unregister_block_type('create-block/post-selector');
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_post_selector_block_init');

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
