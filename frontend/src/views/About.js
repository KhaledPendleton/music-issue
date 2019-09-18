'use strict';

import m from "mithril";

import { App } from "../models/App";

export const About = {
    view: () => {
        const { socialAccounts } = App;

        return [
            m('main', [
                m('h1', 'Welcome to Pipe Dream’s Music Issue'),
                m('p', 'Here, you can check out features on student bands, music-related clubs on campus and local venues in the Binghamton area.'),
                m('p', 'The music scene at Binghamton University and in the Binghamton area is vibrant and eclectic, but its tight-knit culture often causes it to go unheard and unseen by many. Through our features, we hope you’ll gain a new perspective on the music community made up of your peers, professors and Binghamton locals.'),
                m('p', 'Music surrounds virtually every element of college life — from beats blasting in the bars on State Street to your favorite songs to play while studying. Our writers have compiled playlists that are the perfect soundtracks to classic BU student experiences, like hanging out in the Nature Preserve. You can find them all on Spotify and play Pipe Dream’s picks on your next walk to class.')
            ]),
            m('aside', [
                m('h2', 'Follow us'),
                m('ul', socialAccounts.map((acct) => {
                    const { service, url } = acct;
                    const attrs = {
                        href: url,
                        target: '_blank'
                    };

                    return m('li', m('a', attrs, service));
                }))
            ])
        ];
    }
}