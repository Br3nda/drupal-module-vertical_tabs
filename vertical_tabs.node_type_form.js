// $Id: vertical_tabs.node_type_form.js,v 1.1.2.1 2009/11/18 20:28:34 davereid Exp $

Drupal.verticalTabs = Drupal.verticalTabs || {};


Drupal.verticalTabs.comment = function() {
  var vals = [];

  vals.push($(".vertical-tabs-comment input[name='comment']:checked").parent().text());

  // Threading.
  var threading = $(".vertical-tabs-comment input[name='comment_default_mode']:checked").parent().text();
  if (threading) {
    vals.push(threading);
  }

  // Comments per page.
  var number = $(".vertical-tabs-comment select[name='comment_default_per_page'] option:selected").val();
  vals.push(Drupal.t('@number comments per page', {'@number': number}));

  return vals.join(', ');
}
