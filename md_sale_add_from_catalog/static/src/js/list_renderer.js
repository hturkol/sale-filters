/** @odoo-module **/

import Context from 'web.Context';
import { FieldOne2Many } from 'web.relational_fields';
import FieldRegistry from 'web.field_registry';
import ListRenderer from 'web.ListRenderer';
import config from 'web.config';

ListRenderer.include({
    init: function (parent, state, params) {
        this._super.apply(this, arguments);
        var control_element = this.arch.children.filter(child => child.tag == 'control')
        if (control_element.length){
        	var button_elements = control_element[0].children.filter(child => child.tag === 'button')
        	button_elements.forEach(button => {
        		if (button.attrs.show_in_line === 'true'){
        			this.creates.push({
	                    context: button.attrs.context,
	                    string: button.attrs.string,
	                });
        		}
        	})
        }
    },
})
