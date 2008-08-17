Drupal.verticalTabs = Drupal.verticalTabs || {};

Drupal.behaviors.verticalTabs = function() {
  if (!$('.vertical-tabs-list').size()) {
    var ul = $('<div class="vertical-tabs"><ul class="vertical-tabs-list"></ul></div>').find('ul');
    $.each(Drupal.settings.verticalTabs, function(k, v) {
      var description = '';
      if (v.callback && Drupal.verticalTabs[v.callback]) {
        description = '<span class="description">'+ Drupal.verticalTabs[v.callback].apply(this, v.args) +'</span>';
      }
      ul.append($('<li><a href="#' + k + '" class="vertical-tabs-list-' + k + '">'+ v.name + description +'</a></li>')
          .find('a')
          .bind('click', function() { $(this).parent().addClass('selected').siblings().removeClass('selected'); $('.vertical-tabs-' + k).show().siblings('.vertical-tabs-div').hide(); return false; })
          .end())
        .end()
        .append($('.vertical-tabs-' + k + ' > .fieldset-wrapper')
        .addClass('vertical-tabs-' + k)
        .addClass('vertical-tabs-div'));
      if (v.callback && Drupal.verticalTabs[v.callback]) {
        ul.end()
          .bind('change', function() { $('.vertical-tabs-list-' + k + ' > .description').html(Drupal.verticalTabs[v.callback].apply(this, v.args)); $('.vertical-tabs-' + k).height($('.vertical-tabs ul').height() - 13) })
          .end()
          .find('ul');
      }
      $('.vertical-tabs-' + k).remove();
    });
    ul.end().insertBefore('.buttons');
    var max = Math.max($('.vertical-tabs ul').height() - 12, $('.vertical-tabs-div:first').height());
    $('.vertical-tabs-div').each(function() {
      max = Math.max(max, $(this).height());
    });
    $('.vertical-tabs-div').height(max).hide();
    $('.vertical-tabs-div:first').show();
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
