
Drupal.verticalTabs.book = function() {
  var text = $('#edit-book-bid option[selected]').text();
  if (text == Drupal.t('<none>')) {
    return Drupal.t('Not in book');
  }
  else if (text == Drupal.t('<create a new book>')) {
    return Drupal.t('New book');
  }
  return text;
}

Drupal.verticalTabs.revision = function() {
  var val = $('#edit-revision').attr('checked');
  if (val) {
    return Drupal.t('Create new revision');
  }
  else {
    return Drupal.t('Don\'t create new revision');
  }
}

Drupal.verticalTabs.authoring = function() {
  var name = $('#edit-name').val(), date = $('#edit-date').val();
  if (date) {
    return Drupal.t('By @name on @date', { '@name': name, '@date': date });
  }
  else {
    return Drupal.t('By @name', { '@name': name });
  }
}

Drupal.verticalTabs.publishingOptions = function() {
  var vals = [];
  if ($('#edit-status').attr('checked')) {
    vals.push(Drupal.t('Published'));
  }
  if ($('#edit-promote').attr('checked')) {
    vals.push(Drupal.t('Promoted to front page'));
  }
  if ($('#edit-sticky').attr('checked')) {
    vals.push(Drupal.t('Sticky on top of lists'));
  }
  if (vals.join(', ') == '') {
    return Drupal.t('None');
  }
  return vals.join(', ');
}

Drupal.verticalTabs.menu = function() {
  if ($('#edit-menu-link-title').val()) {
    return $('#edit-menu-link-title').val();
  }
  else {
    return Drupal.t('Not in menu');
  }
}

Drupal.verticalTabs.comment = function() {
  return $('.vertical-tabs-comment_settings input[checked]').parent().text().replace(/^\s*(.*)\s*$/, '$1');
}

Drupal.verticalTabs.attachments = function() {
  var size = $('#upload-attachments tbody tr').size();
  if (size) {
    return Drupal.formatPlural(size, '1 attachment', '@count attachments');
  }
  else {
    return Drupal.t('No attachments');
  }
}

Drupal.verticalTabs.path = function() {
  var path = $('#edit-path').val();
  var automatic = $('#edit-pathauto-perform-alias').attr('checked');

  if (automatic) {
    return Drupal.t('Automatic alias');
  }
  if (path) {
    return Drupal.t('Alias: @alias', { '@alias': path });
  }
  else {
    return Drupal.t('No alias');
  }
}