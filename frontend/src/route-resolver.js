'use strict';

import m from "mithril";

import { Layout } from "./views/components/Layout";

export function createRouteResolver(routes) {
    return routes.reduce((accumulator, route) => {
        const { path, component } = route;
        const onmatch = component.onmatch || (() => component);
        const render = component.render || ((vnode) => m(Layout, vnode));

        accumulator[path] = { onmatch, render };
        return accumulator;
    }, {});
}