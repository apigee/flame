<?php
/**
 * @file
 * fhir_custom.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function fhir_custom_user_default_roles() {
  $roles = array();

  // Exported role: administrator.
  $roles['administrator'] = array(
    'name' => 'administrator',
    'weight' => 10,
  );

  return $roles;
}
