# -*- coding: utf-8 -*-
# Powered by Mindphin.
# © 2023 Mindphin. (<https://www.mindphin.com>).

{
    "name": "Sale Add From Catalog",
    "version": "15.0.1.0",
    "summary": """
    The Sale Add from Catalog module is a powerful tool designed to enhance the efficiency and accuracy of the sales quotation process within an organization. It streamlines the integration of cataloged products into sales transactions, allowing users to swiftly select and include items directly from the catalog.
     | Sale Cart | Add Product on sale | Product Cart | Sale Order | add product on sale | sale cart | quick add product |
     Product add widget | Add Sale Order Line In Batch | Mass Product | Mass add product | product widget | Product Catalog | Sale Catalog | Sale Product Catalog""",
    "description": """
    The Sale Add from Catalog module serves as a pivotal component within the Sales application, offering a range of robust features to optimize the sales quotation workflow. Its goal is to simplify and expedite the process of adding products from catalog to sales orders while maintaining data integrity.
    """,
    'author': "Mindphin",
    'website': "www.mindphin.com",
    "category": 'Sales/Sales',
    "license": 'OPL-1',
    "depends": ['sale_management'],
    "data": [
        'views/sale_view.xml',
        'views/product_kanban_view.xml'
    ],
    'assets': {
        'web.assets_backend': [
            'md_sale_add_from_catalog/static/src/js/sale_product_quantity.js',
            'md_sale_add_from_catalog/static/src/js/kanban_view/model.js',
            'md_sale_add_from_catalog/static/src/js/kanban_view/controller.js',
            'md_sale_add_from_catalog/static/src/js/kanban_view/renderer.js',
            'md_sale_add_from_catalog/static/src/js/kanban_view/record.js',
            'md_sale_add_from_catalog/static/src/js/kanban_view/view.js',
            'md_sale_add_from_catalog/static/src/js/custom.js',
            'md_sale_add_from_catalog/static/src/scss/product_product_views.scss',
            'md_sale_add_from_catalog/static/src/scss/fsm_product_quantity.scss',
            'md_sale_add_from_catalog/static/src/js/button.js',
            'md_sale_add_from_catalog/static/src/js/list_renderer.js',
        ],
        'web.assets_qweb': [
            'md_sale_add_from_catalog/static/src/xml/sale_quantity.xml',
            'md_sale_add_from_catalog/static/src/xml/button.xml',
        ],
    },
    "application": False,
    "installable": True,
    "auto_install": False,
    'images': ['static/description/banner.png'],
    "price": 25,
    "currency": 'USD',
}
