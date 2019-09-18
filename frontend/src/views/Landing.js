'use strict';

import m from "mithril";

import { Layout } from "./components/Layout";

export const Landing = {
    view: () => {
        return m(Layout, m('h1', 'Hello world'))
    }
}