'use strict';

import m from "mithril";

import { Layout } from "./components/Layout";

export const About = {
    view: () => {
        return m(Layout, m('h1', 'About'))
    }
}