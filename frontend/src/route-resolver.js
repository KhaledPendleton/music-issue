'use strict';

export function createRouteResolver(routes) {
    return routes.reduce((accumulator, route) => {
        const { path, component } = route;
        const onmatch = component.onmatch || (() => component);
        const render = component.render || ((vnode) => vnode);

        accumulator[path] = { onmatch, render };
        return accumulator;
    }, {});
}