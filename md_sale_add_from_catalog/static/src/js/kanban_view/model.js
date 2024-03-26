odoo.define('md_sale_add_from_catalog.ProductKanbanModel', function (require) {
"use strict";

const KanbanModel = require('web.KanbanModel');

return KanbanModel.extend({

    async save(recordID, options) {
        const record = this.localData[recordID];
        const changes = record._changes;
        let rpc = null;

        if (changes && changes.sale_quantity !== undefined) {
            const quantity = changes.sale_quantity;
            delete changes.sale_quantity;
            rpc = this._getEditFSMQuantityRpc(record, quantity);
        } else if (options && options.fsm_quantity_action) {
            rpc = this._getFSMQuantityButtonRpc(record, options.fsm_quantity_action);
        }

        if (rpc) {
            const changedFields = await Promise.all([
                this._super(...arguments),
                this._saveFSMQuantity(rpc),
            ]);
            await this._fetchRecord(record);
            return changedFields.flat();
        }
        return this._super(...arguments);
    },

    async _saveFSMQuantity(rpc) {
        const action = await this._rpc(rpc);
        if (typeof action === 'object') {
            await new Promise((resolve) => {
                this.do_action(action, { on_close: resolve });
            });
        }
        return ['sale_quantity'];
    },

    _getEditFSMQuantityRpc(record, quantity) {
        return {
            model: 'product.product',
            method: 'set_sale_quantity',
            args: [record.data.id, quantity],
            context: record.getContext(),
        };
    },

    _getFSMQuantityButtonRpc(record, action) {
        return {
            model: 'product.product',
            method: action,
            args: [record.data.id],
            context: record.getContext(),
        };
    }
});

});
