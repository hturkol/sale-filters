odoo.define('md_sale_add_from_catalog.kanban_button', function(require) {
   "use strict";
   var KanbanController = require('web.KanbanController');
   var KanbanView = require('web.KanbanView');
   var viewRegistry = require('web.view_registry');
   var KanbanButton = KanbanController.include({
       buttons_template: 'md_sale_add_from_catalog.button',
       events: _.extend({}, KanbanController.prototype.events, {
           'click .open_sale_order_action': '_onBackButtonClick',
       }),
       _onBackButtonClick: function () {
        window.history.back();
   }
   });
   var ProductKanbanView = KanbanView.extend({
       config: _.extend({}, KanbanView.prototype.config, {
           Controller: KanbanButton
       }),
   });
   viewRegistry.add('button_in_kanban', ProductKanbanView);
});
