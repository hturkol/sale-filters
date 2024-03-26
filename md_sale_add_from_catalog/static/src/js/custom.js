odoo.define('md_sale_add_from_catalog.section_and_note_backend', function(require) {
            "use strict";
            var catalog = require('account.section_and_note_backend');
            catalog.include({
                _renderBodyCell: function (record, node, index, options) {
                    var $cell = this._super.apply(this, arguments);
                    var self = this;
                    var isSection = record.data.display_type === 'line_section';
                    var isNote = record.data.display_type === 'line_note';
                    if (record.data.display_type == 'product'){
                        this._rpc({
                            model: 'sale.order',
                            method: 'sale_products_view_btn',
                            args: [[record.context.sale_order_id]],
                        }).then(function (action) {
                            self.do_action(action);
                        });
                    }
                    if (isSection || isNote) {
                        if (node.attrs.widget === "handle") {
                            return $cell;
                        } else if (node.attrs.name === "name") {
                            var nbrColumns = this._getNumberOfCols();
                            if (this.handleField) {
                                nbrColumns--;
                            }
                            if (this.addTrashIcon) {
                                nbrColumns--;
                            }
                            $cell.attr('colspan', nbrColumns);
                        } else {
                            $cell.removeClass('o_invisible_modifier');
                            return $cell.addClass('o_hidden');
                        }
                    }
                    return $cell;
                }
            });
});
