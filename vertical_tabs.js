Drupal.verticalTabs = Drupal.verticalTabs || {};

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
