'use strict';

import m from "mithril";

import { NavPrimary } from "./Nav-Primary";

export const Layout = {
    view: (vnode) => {
        return m(NavPrimary);
    }
}