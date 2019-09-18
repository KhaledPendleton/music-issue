'use strict';

import m from "mithril";

import { createRouteResolver } from "./route-resolver";
import { App } from "./models/App";
import "./main.css";

const root = document.querySelector('.js-root');
const router = createRouteResolver(App.routes);

// m.route.prefix = '';

m.route(root, '/', router);