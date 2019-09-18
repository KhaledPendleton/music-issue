'use strict';

import { Landing } from "./views/Landing";
import { About } from "./views/About";

export const routes = [
    {path: '/', component: Landing},
    {path: '/about', component: About}
];