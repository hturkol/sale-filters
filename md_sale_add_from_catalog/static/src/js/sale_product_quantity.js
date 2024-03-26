odoo.define('md_sale_add_from_catalog.sale_product_quantity', function (require) {
"use strict";

const { _t } = require('web.core');
const { FieldInteger } = require('web.basic_fields');
const field_registry = require('web.field_registry');


const FSMProductQty = FieldInteger.extend({
    description: _t("FSM Product Quantity"),
    template: "FSMProductQuantity",
    events: _.extend({}, FieldInteger.prototype.events, {
        'click button[name="sale_remove_quantity"]': '_removeQuantity',
        'click button[name="sale_add_quantity"]': '_addQuantity',
        'click span[name="sale_quantity"]': '_editQuantity',
        'blur span[name="sale_quantity"]': '_onBlur',
        'keypress span[name="sale_quantity"]': '_onKeyPress',
        'keydown span[name="sale_quantity"]': '_onKeyDown',
    }),

    init: function (parent, name, record, options) {
        options.mode = 'edit';
        this._super.apply(this, arguments);
        this.isReadonly = !!record.context.hide_qty_buttons;
        this.mode = 'readonly';
        this.muteRemoveQuantityButton = false;
        this.exitEditMode = false;
    },

    start: function () {
        this.$buttons = this.$('button');
        this.$fsmQuantityElement = this.$('span[name="sale_quantity"]');
        this.$el.on('click', (e) => this._onWidgetClick(e));
        this._super.apply(this, arguments);
    },

    setInvalidClass: function () {
        this.$fsmQuantityElement.addClass('o_field_invalid');
        this.$fsmQuantityElement.attr('aria-invalid', 'true');
    },

    removeInvalidClass: function () {
        this.$fsmQuantityElement.removeClass('o_field_invalid');
        this.$fsmQuantityElement.removeAttr('aria-invalid');
    },

    _onWidgetClick: function (event) {
        event.stopImmediatePropagation();
    },

    _changeQuantity: function (action) {
        this.trigger_up(action, {
            dataPointID: this.dataPointID,
        });
    },

    _removeQuantity: function (e) {
        e.stopPropagation();
        if (this.muteRemoveQuantityButton) {
            return;
        }

        if (this._isValid) {
            if (this._isDirty) {
                const value = Number(this._getValue());
                if (value > 0) {
                    this._setValue((value - 1).toString());
                }
            } else if (this.value > 0) {
                this._changeQuantity('sale_remove_quantity');
            }
        }
    },

    _addQuantity: async function (e) {
        e.stopPropagation();
        if (this._isValid) {
            if (this._isDirty) {
                const value = Number(this._getValue()) + 1;
                this._setValue(value.toString());
            } else {
                this._changeQuantity('sale_add_quantity');
            }
        }
    },

    _editQuantity: function (e) {
        e.stopPropagation();
        if (this.mode == 'edit') {
            return;
        }

        if (!this.isReadonly) {
            this.exitEditMode = false;
            this.mode = 'edit';
            this._renderEdit();
        }
    },

    _onKeyDown: function (e) {
        e.stopPropagation();
        if (e.keyCode === $.ui.keyCode.ENTER) {
            e.preventDefault();
            this._onBlur();
        } else if ((e.ctrlKey || e.metaKey) && ['c', 'v'].includes(e.key)) {
            e.preventDefault();
        }
    },

    _onKeyPress: function (e) {
        e.stopPropagation();
        if (e.key.length === 1) { // then it is a character
            if (!/[0-9]/.test(e.key) || (!this._getSelectedText() && e.target.innerText.length >= 9)) { // if the key is not a number then bypass it.
                e.preventDefault();
            }
        }
    },

    _onInput: function () {
        this._formatFSMQuantity();
        if (this.hasOwnProperty('range')) {
            this._removeFSMQuantitySelection();
        }
        this.$input.val(this.$fsmQuantityElement.text());
        this._super.apply(this, arguments);
        if (!this._isValid) {
            this.setInvalidClass();
        } else {
            this.removeInvalidClass();
        }
    },

    _getValue: function () {
        return this.$input ? this.$input.val() : this.value;
    },

    _onBlur: async function () {
        if (!this._isValid && this._isLastSetValue(this._getValue())) return;
        try {
            await this._setValue(this._getValue(), this.options || { notifyChange: false });
            this.removeInvalidClass();
            if (this.mode !== 'readonly') {
                this.mode = 'readonly';
                this.exitEditMode = true;
                this._renderReadonly();
            }
        } catch (err) {
            if (err.message.data.name !== 'odoo.exceptions.UserError') {
                this.displayNotification({ message: _t("The set quantity is invalid"), type: 'danger' });
            }
            this.setInvalidClass();
        }
    },

    _formatFSMQuantity: function () {
        this.$fsmQuantityElement.toggleClass('small', this.$fsmQuantityElement.text().length > 5);
    },

    _getSelectedText: function () {
        if (window.getSelection) {
            return window.getSelection().toString();
        } else if (document.selection) {
            return document.selection.createRange().text;
        }
        return '';
    },

    _selectFSMQuantity: function () {
        if (this.value === 0) {
            return;
        }
        const element = this.$fsmQuantityElement[0];
        if (document.body.createTextRange) {
            this.range = document.body.createTextRange();
            this.range.moveToElementText(element);
            this.range.select();
        } else if (window.getSelection) {
            const selection = window.getSelection();
            this.range = document.createRange();
            this.range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(this.range);
        }
    },

    _removeFSMQuantitySelection: function () {
        if (window.getSelection) {
            const selection = window.getSelection();
            if (selection.removeRange) {
                selection.removeRange(this.range);
            } else { 
                selection.removeAllRanges();
            }
        }
        delete this.range;
    },

    _render: function () {
        this.mode = 'readonly';
        this.exitEditMode = false;
        this.muteRemoveQuantityButton = this.record.data.hasOwnProperty('quantity_decreasable') && !this.record.data.quantity_decreasable;
        this._super.apply(this, arguments);
        this._formatFSMQuantity();
    },

    _renderButtons: function () {
        this.$buttons
            .toggleClass('btn-primary', this.value !== 0);
        this.$buttons
            .filter('button[name="sale_add_quantity"]')
            .toggleClass('btn-light text-muted', this.value === 0);
        this.$buttons
            .filter('button[name="sale_remove_quantity"]')
            .toggleClass('btn-light text-muted', this.value === 0 || this.muteRemoveQuantityButton)
            .attr('disabled', this.value === 0 || this.muteRemoveQuantityButton);
    },

    _renderEdit: function () {
        this._renderButtons();
        this._prepareInput(this.$fsmQuantityElement);
        this.$fsmQuantityElement
            .attr('contenteditable', true)
            .removeClass('text-muted')
            .text(this.value === 0 ? "" : this.value)
            .focus();
        this._selectFSMQuantity();
    },

    _renderReadonly: function () {
        this._renderButtons();
        this.$fsmQuantityElement
            .attr('contenteditable', false)
            .removeClass('o_input')
            .toggleClass('text-muted', this.value === 0)
            .text(this.value);
        this._isDirty = false;
    },
    destroy: function () {
        this.$el.off('click');
        this._super.apply(this, arguments);
    }
});

field_registry.add('fsm_product_quantity', FSMProductQty);

return { FSMProductQty };

});
