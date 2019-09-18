'use strict';

import { Landing } from "../views/Landing";
import { About } from "../views/About";

export const App = {
    routes: [
        {path: '/', component: Landing},
        {path: '/about', component: About}
    ],
    socialAccounts: [
        {service: 'Twitter', url: 'https://twitter.com/bupipedream'},
        {service: 'Facebook', url: 'https://www.facebook.com/bupipedream/' },
        {service: 'Pipe Dream', url: 'https://bupipedream.com' },
        {service: 'Instagram', url: 'https://www.instagram.com/bupipedream/' },
        {service: 'Youtube', url: 'https://www.youtube.com/channel/UCjinYnp5YUbFV_TKJE50rVA' }
    ]
}