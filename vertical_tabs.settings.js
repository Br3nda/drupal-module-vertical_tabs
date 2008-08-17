Drupal.verticalTabs.administrationtheme = function() {
  var text = $('#edit-admin-theme option[selected]').text();
  if (text == Drupal.t('<System default>')) {
    return Drupal.t('System default');
  }
  return text;
}

Drupal.verticalTabs.blogapi = function() {
  var size = $('.vertical-tabs-blogapi input[checked]').size();
  if (size == 0) {
    return Drupal.t('No content types enabled');
  }
  else {
    return Drupal.formatPlural(size, "1 content type enabled", "@count content types enabled");
  }
}
