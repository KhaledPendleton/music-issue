'use strict';

import m from "mithril";

import { App } from "../../models/App";

export const NavPrimary = {
    view: () => {
        const { pageLinks } = App;
        return m('nav', pageLinks.map((link) => {
            const { path, title } = link;
            const attrs = { href: path };
            return m(m.route.Link, attrs, title);
        }));
    }
}