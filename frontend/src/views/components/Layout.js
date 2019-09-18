'use strict';

import m from "mithril";

import { NavPrimary } from "./Nav-Primary";

export const Layout = {
    view: (vnode) => {
        const { children } = vnode;
        return [
            m(NavPrimary),
            children
        ];
    }
}