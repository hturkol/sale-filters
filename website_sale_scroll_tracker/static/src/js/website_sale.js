/** @odoo-module **/

import { WebsiteSale } from 'website_sale.website_sale';
import { _t } from 'web.core';

WebsiteSale.include({
    start: function () {
        if (window.location.pathname === '/nl/shop' || window.location.pathname === '/nl') {
            const scrollTop = localStorage.getItem('scrollTop') || 0;
            $('html, body').animate({ scrollTop }, 'slow');
        }
        return this._super.apply(this, arguments).then(()=> {
            if (window.location.pathname === '/nl/shop' || window.location.pathname === '/nl') {
                $('#wrapwrap').on('scroll', (ev) => {
                    ev.stopPropagation();
                    localStorage.setItem('scrollTop', ev.currentTarget.scrollTop);
                });
            }
        });
    },
});
