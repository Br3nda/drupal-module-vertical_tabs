Drupal.verticalTabs = Drupal.verticalTabs || {};

Drupal.behaviors.verticalTabs = function() {
  if (!$('.vertical-tabs-list').size()) {
    var ul = $('<ul class="vertical-tabs-list"></ul>');
    var fieldsets = $('<div class="vertical-tabs-fieldsets"></div>');
    $.each(Drupal.settings.verticalTabs, function(k, v) {
      var description = '', cssClass = 'vertical-tabs-list-' + k;
      if (v.callback && Drupal.verticalTabs[v.callback]) {
        description = '<span class="description">'+ Drupal.verticalTabs[v.callback].apply(this, v.args) +'</span>';
      }
      else {
        cssClass += ' vertical-tabs-nodescription';
      }

      // Add a list item to the vertical tabs list.
      $('<li><a href="#' + k + '" class="' + cssClass + '">'+ v.name + description +'</a></li>').appendTo(ul)
        .find('a')
        .bind('click', function() {
          $(this).parent().addClass('selected').siblings().removeClass('selected');
          $('.vertical-tabs-' + k).show().siblings('.vertical-tabs-div').hide();
          return false;
        });

      // Add the fieldset contents to the toggled fieldsets.
      $('.vertical-tabs-' + k + ' > .fieldset-wrapper').appendTo(fieldsets)
      .addClass('vertical-tabs-' + k)
      .addClass('vertical-tabs-div')
      .find('input, select, textarea').bind('change', function() {
        if (v.callback && Drupal.verticalTabs[v.callback]) {
          $('a.vertical-tabs-list-' + k + ' span.description').html(Drupal.verticalTabs[v.callback].apply(this, v.args));
        }
      });
      $('.vertical-tabs-' + k).remove();
    });

    $('div.vertical-tabs').html(ul).append(fieldsets);

    // Adjust the height of the active field area to be no less than the
    // total height of all the tabs.
    var max = Math.max($('.vertical-tabs ul').height() - 25, $('.vertical-tabs-div:first').height());
    $('.vertical-tabs-div').each(function() {
      max = Math.max(max, $(this).height());
    });
    $('.vertical-tabs-div').height(max).hide();

    // Activate the first tab.
    $('.vertical-tabs-div:first').show();
    $('.vertical-tabs ul li:first').addClass('selected');

  }
}

Drupal.behaviors.verticalTabsReload = function() {
  $.each(Drupal.settings.verticalTabs, function(k, v) {
    if (v.callback && Drupal.verticalTabs[v.callback]) {
      $('a.vertical-tabs-list-' + k + ' span.description').html(Drupal.verticalTabs[v.callback].apply(this, v.args));
    }
  });
}
