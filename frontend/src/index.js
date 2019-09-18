'use strict';

import m from "mithril";

import { createRouteResolver } from "./route-resolver";
import { routes } from "./routes";
import "./main.css";

const root = document.querySelector('.js-root');
const router = createRouteResolver(routes);

// m.route.prefix = '';

m.route(root, '/', router);