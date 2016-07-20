<?php
/**
 * @file
 * fhir_custom.features.menu_links.inc
 */

/**
 * Implements hook_menu_default_menu_links().
 */
function fhir_custom_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: main-menu_apis:patient/apis/get
  $menu_links['main-menu_apis:patient/apis/get'] = array(
    'menu_name' => 'main-menu',
    'link_path' => 'patient/apis/get',
    'router_path' => '',
    'link_title' => 'APIs',
    'options' => array(
      'attributes' => array(
        'title' => 'APIs',
      ),
      'item_attributes' => array(
        'id' => '',
        'class' => '',
        'style' => '',
      ),
      'identifier' => 'main-menu_apis:patient/apis/get',
    ),
    'module' => 'menu',
    'hidden' => 0,
    'external' => 1,
    'has_children' => 0,
    'expanded' => 0,
    'weight' => -50,
    'customized' => 1,
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('APIs');

  return $menu_links;
}
