odoo.define('md_sale_add_from_catalog.ProductKanbanRenderer', function (require) {
"use strict";

const KanbanRenderer = require('web.KanbanRenderer');
const KanbanRecord = require('md_sale_add_from_catalog.ProductKanbanRecord');

return KanbanRenderer.extend({
    config: _.extend({}, KanbanRenderer.prototype.config, {
        KanbanRecord
    }),
});

});
