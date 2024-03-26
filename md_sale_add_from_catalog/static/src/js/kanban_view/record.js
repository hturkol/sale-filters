odoo.define('md_sale_add_from_catalog.ProductKanbanRecord', function (require) {
"use strict";

const KanbanRecord = require('web.KanbanRecord');

return KanbanRecord.extend({
    events: _.extend({}, KanbanRecord.prototype.events, {
        'click': '_onKanbanRecordClicked',
        'click .o_dropdown_kanban > *': '_toggleDropDownMenu',
    }),

    _toggleDropDownMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.classList.contains('dropdown-toggle')) {
            $(e.currentTarget).dropdown('toggle');
        }
    },

    _onKanbanRecordClicked: function (e) {
        e.stopPropagation();
        if (this.subWidgets && this.subWidgets.hasOwnProperty('sale_quantity') && !this.state.context.hide_qty_buttons) {
            const fsmQuantityWidget = this.subWidgets.sale_quantity;
            if (fsmQuantityWidget.mode === 'readonly' && !fsmQuantityWidget.exitEditMode) {
                fsmQuantityWidget._addQuantity(new Event('click'));
            }
        }
    },

    _getImageURL: function () {
        if (!this.imageURL) {
            this.imageURL = this._super.apply(this, arguments);
        }
        return this.imageURL;
    },
});

});
