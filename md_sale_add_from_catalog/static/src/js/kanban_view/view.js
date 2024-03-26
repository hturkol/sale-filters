odoo.define('md_sale_add_from_catalog.ProductKanbanView', function (require) {
"use strict";

const KanbanView = require('web.KanbanView');
const KanbanModel = require('md_sale_add_from_catalog.ProductKanbanModel');
const KanbanController = require('md_sale_add_from_catalog.ProductKanbanController');
const KanbanRenderer = require('md_sale_add_from_catalog.ProductKanbanRenderer');
const viewRegistry = require('web.view_registry');

const ProductKanbanView = KanbanView.extend({
    config: _.extend({}, KanbanView.prototype.config, {
        Model: KanbanModel,
        Controller: KanbanController,
        Renderer: KanbanRenderer,
    }),
});

viewRegistry.add('fsm_product_kanban', ProductKanbanView);

return ProductKanbanView;

});
