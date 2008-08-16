Drupal.verticalTabs = Drupal.verticalTabs || {};

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
  if (path) {
    return Drupal.t('Alias: @alias', { '@alias': path });
  }
  else {
    return Drupal.t('No alias');
  }
}

Drupal.behaviors.verticalTabs = function() {
  if (!$('.vertical-tabs-list').size()) {
    var ul = $('<div class="vertical-tabs"><ul class="vertical-tabs-list"></ul></div>').find('ul');
    $.each(Drupal.settings.verticalTabs, function(k, v) {
      if (v.callback && Drupal.verticalTabs[v.callback]) {
        ul.append($('<li><a href="#' + k + '" class="vertical-tabs-list-' + k + '">'+ v.name +'<span class="description">'+ Drupal.verticalTabs[v.callback].apply(this, v.args) +'</span></a></li>')
            .find('a')
            .bind('click', function() { $(this).parent().addClass('selected').siblings().removeClass('selected'); $('.vertical-tabs-' + k).height($('.vertical-tabs ul').height() - 13).show().siblings('.vertical-tabs-div').hide(); return false; })
            .end())
          .end()
          .append($('.vertical-tabs-' + k + ' > .fieldset-wrapper')
          .addClass('vertical-tabs-' + k)
          .addClass('vertical-tabs-div'))
          .find('input, select, textarea')
          .bind('change', function() { $('.vertical-tabs-list-' + k + ' > .description').html(Drupal.verticalTabs[v.callback].apply(this, v.args)); $('.vertical-tabs-' + k).height($('.vertical-tabs ul').height() - 13) })
          .end()
          .find('ul');
          $('.vertical-tabs-' + k).remove();
      }
    });
    ul.end().insertBefore('.buttons');
    $('.vertical-tabs-div').hide();
    $('.vertical-tabs-div:first').show().height($('.vertical-tabs ul').height() - 13);
    $('.vertical-tabs ul li:first').addClass('selected');
  }
}

Drupal.behaviors.verticalTabsReload = function() {
  $.each(Drupal.settings.verticalTabs, function(k, v) {
    if (v.callback && Drupal.verticalTabs[v.callback]) {
      $('.vertical-tabs-' + k + '.vertical-tabs-processed legend a span').html(Drupal.verticalTabs[v.callback].apply(this, v.args));
    }
  });
}
