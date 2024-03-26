odoo.define('md_sale_add_from_catalog.ProductKanbanController', function (require) {
"use strict";

const KanbanController = require('web.KanbanController');

return KanbanController.extend({
    custom_events: _.extend({}, KanbanController.prototype.custom_events, {
        'sale_add_quantity': '_onActionFSMQuantity',
        'sale_remove_quantity': '_onActionFSMQuantity',
    }),

    _onActionFSMQuantity: async function (e) {
        e.stopPropagation();
        return this.model.save(e.data.dataPointID, {fsm_quantity_action: e.name})
            .then(() => this._confirmSave(e.data.dataPointID))
            .guardedCatch(() => this._rejectSave(e.data.dataPointID));
    },
});

});
