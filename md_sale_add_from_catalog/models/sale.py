# -*- coding: utf-8 -*-
# Powered by Mindphin.
# © 2023 Mindphin. (<https://www.mindphin.com>).

from odoo import models, _, api
from odoo.osv import expression


class SaleOrder(models.Model):
    _inherit = "sale.order"

    def sale_products_view_btn(self):
        self = self.with_company(self.company_id)
    
        domain = [
            ('sale_ok', '=', True),
            '|', ('detailed_type', 'in', ['consu', 'product']),
            '&', '&', ('detailed_type', '=', 'service'), ('invoice_policy', '=', 'delivery'), ('service_type', '=', 'manual'),
            '|', ('company_id', '=', self.company_id.id), ('company_id', '=', False)]
        deposit_product = self.env['ir.config_parameter'].sudo().get_param('sale.default_deposit_product_id')
        if deposit_product:
            domain = expression.AND([domain, [('id', '!=', deposit_product)]])

        kanban_view = self.env.ref('md_sale_add_from_catalog.sale_product_kanban_view')
        search_view = self.env.ref('md_sale_add_from_catalog.sale_product_search_form_view')
        return {
            'type': 'ir.actions.act_window',
            'name': _('Choose Products'),
            'res_model': 'product.product',
            'views': [(kanban_view.id, 'kanban'), (False, 'form')],
            'search_view_id': [search_view.id, 'search'],
            'domain': domain,
            'context': {
                'create': self.env['product.template'].check_access_rights('create', raise_exception=False),
                'sale_order_id': self.id,
                'pricelist': self.partner_id.property_product_pricelist.id,
                'hide_qty_buttons': self.state == 'done',
                'default_invoice_policy': 'delivery',
            },
            'help': _("""<p class="o_view_nocontent_smiling_face">
                            Create a new product
                        </p><p>
                            You must define a product for everything you sell or purchase,
                            whether it's a storable product, a consumable or a service.
                        </p>""")
        }


class SaleOrderLine(models.Model):
    _inherit = "sale.order.line"

    def sale_products_view_btn(self):
        self = self.with_company(self.company_id)

        domain = [
            ('sale_ok', '=', True),
            '|', ('detailed_type', 'in', ['consu', 'product']),
            '&', '&', ('detailed_type', '=', 'service'), ('invoice_policy', '=', 'delivery'), ('service_type', '=', 'manual'),
            '|', ('company_id', '=', self.company_id.id), ('company_id', '=', False)]
        deposit_product = self.env['ir.config_parameter'].sudo().get_param('sale.default_deposit_product_id')
        if deposit_product:
            domain = expression.AND([domain, [('id', '!=', deposit_product)]])

        kanban_view = self.env.ref('md_sale_add_from_catalog.sale_product_kanban_view')
        search_view = self.env.ref('md_sale_add_from_catalog.sale_product_search_form_view')
        return {
            'type': 'ir.actions.act_window',
            'name': _('Choose Products'),
            'res_model': 'product.product',
            'views': [(kanban_view.id, 'kanban'), (False, 'form')],
            'search_view_id': [search_view.id, 'search'],
            'domain': domain,
            'context': {
                'create': self.env['product.template'].check_access_rights('create', raise_exception=False),
                'sale_order_id': self.order_id.id,
                'pricelist': self.order_id.partner_id.property_product_pricelist.id,
                'hide_qty_buttons': self.order_id.state == 'done',
                'default_invoice_policy': 'delivery',
            },
            'help': _("""<p class="o_view_nocontent_smiling_face">
                            Create a new product
                        </p><p>
                            You must define a product for everything you sell or purchase,
                            whether it's a storable product, a consumable or a service.
                        </p>""")
        }
