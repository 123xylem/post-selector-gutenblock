<?php

namespace DMG;

if (defined('WP_CLI') && WP_CLI) {

  /**
   * Returns posts containing dmg-link-block
   */
  class DMG_CLI
  {
    /**
     * Returns posts containing dmg-link-block. 
     * For performance:
     * Batched query into chunks
     * Targets post_meta as opposed to a text search of post_content
     *
     * ## OPTIONS
     *
     * [--date-before=<date>]
     * : Find posts published before the given date.
     *
     * [--date-after=<date>]
     * : Find posts published after the given date.
     *
     * ## EXAMPLES
     *
     * wp dmg_read_more_search --date-before=2024-01-01
     * wp dmg_read_more_search --date-after=2023-01-01
     * wp dmg_read_more_search --date-before=2024-01-01 --date-after=2023-01-01
     *
     * @when after_wp_load
     */
    public function search($args, $assoc_args)
    {

      $before_date = isset($assoc_args['date-before']) ? $assoc_args['date-before'] : null;
      $after_date = isset($assoc_args['date-after']) ? $assoc_args['date-after'] : null;
      $date_query = [];

      if ($before_date) {
        if (!$this->isValidDate($before_date)) {
          \WP_CLI::error('Invalid date - must be YYYY-MM-DD format');
        }
        $date_query[] = array(
          'before' => $before_date,
          'inclusive' => true,
        );
        \WP_CLI::line('Finding Posts published before: ' . $before_date);
      }
      if ($after_date) {
        if (!$this->isValidDate($after_date)) {
          \WP_CLI::error('Invalid date - must be format YYYY-MM-DD ');
        }

        $date_query[] = array(
          'after' => $after_date,
          'inclusive' => true,
        );

        \WP_CLI::line('Finding Posts published after: ' . $after_date);
      }

      if (!$after_date && !$before_date) {
        $thirtyDaysAgo =  date('c', strtotime('-30 days'));
        $date_query[] = array(
          'after' => $thirtyDaysAgo,
          'inclusive' => true
        );
      }

      $searchArgs = array(
        'date_query' => $date_query,
        'meta_key' => 'has_post_selector',
        'meta_value' => 'yes',
        'posts_per_page' => 100,
        'post_type' => 'post',
        'fields' => 'ids',
        'cache_results' => false
      );
      $foundPosts = 0;

      for ($i = 1; $i < 1000000; $i++) {
        $searchArgs['paged'] = $i;

        $query = new \WP_Query($searchArgs);

        if ($query->have_posts()) {
          while ($query->have_posts()) {
            $query->the_post();
            $foundPosts++;
            \WP_CLI::log('Post found: ' . get_the_ID());
          }
        } else {
          if ($foundPosts > 0) {
            \WP_CLI::success($foundPosts . ' Posts retrieved successfully!');
          } else {
            \WP_CLI::error('No posts found');
          }
          break;
        }
      }

      wp_reset_postdata();
    }

    public function isValidDate($date)
    {
      $format = 'Y-m-d';
      $d = \DateTime::createFromFormat($format, $date);

      return $d && $d->format($format) === $date;
    }
  }

  \WP_CLI::add_command('dmg_read_more', 'DMG\DMG_CLI');
}
