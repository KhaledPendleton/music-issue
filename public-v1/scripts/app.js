window.addEventListener('DOMContentLoaded', main);

function main() {
    const settings = getSettings();
    const api = createApi(settings);
    const view = createView();
    const model = createModel(settings);
    const actions = createActions(model, api);
    const routeResolver = createRouteResolver(model, actions, view);

    m.route.prefix('');
    m.route(settings.root, settings.defaultRoute, routeResolver);
}

function getSettings() {
    const paths = [
        { name: 'home', route: '/home' },
        { name: 'features', route: '/features' },
        { name: 'playlists', route: '/playlists' },
    ];

    const social = [
        { name: 'Twitter', href: 'https://twitter.com' },
        { name: 'Facebook', href: 'https://facebook.com' },
        { name: 'Pipe Dream', href: 'https://bupipedream.com' },
        { name: 'Instagram', href: 'https://instagram.com' },
        { name: 'Youtube', href: 'https://youtube.com' }
    ];

    const defaultRoute = paths[0].route;
    const root = document.querySelector('.js-app');

    return { root, paths, defaultRoute, social };
}

function createApi(settings) {
    return {};
}

function createModel(settings) {
    return {
        paths: settings.paths.slice(),
        routeName: undefined,
        params: undefined,
        title: 'Music Issue 2019',
        socialLinks: settings.social.slice(),
        menubar: {
            isVisible: false,
            toggleText: 'Menu'
        },
        pages: {
            playlists: {
                articles: [
                    { title: 'The Spine', src: 'https://www.bupipedream.com/ac/106717/playlist-the-spine/', thumbnail: '/images/the-spine-thumbnail.jpg' },
                    { title: 'State Street', src: 'https://www.bupipedream.com/ac/106750/playlist-state-street/', thumbnail: '/images/state-street-thumbnail.jpg' },
                    { title: 'The Nature Preserve', src: 'https://www.bupipedream.com/ac/106767/playlist-the-nature-preserve/', thumbnail: '/images/the-nature-preserve-thumbnail.jpg' },
                    { title: 'The Library', src: 'https://www.bupipedream.com/ac/106776/playlist-the-library/', thumbnail: '/images/the-library-thumbnail.jpg' }
                ]
            },
            features: {
                hover: '',
                articles: [
                    { title: 'The Groovy Boys', src: 'https://www.bupipedream.com/ac/106830/music-issue-2019-the-groovy-boys/', thumbnail: '/images/groovy-boys.jpg' },
                    { title: 'Moefest 2019', src: 'https://www.youtube.com/watch?v=7yN550kJZYg', thumbnail: '/images/moefest-2019.jpg' },
                    { title: 'A space for underground music', src: 'https://www.bupipedream.com/ac/106786/avenue-diy-creates-a-space-for-underground-music/', thumbnail: '/images/ave-diy.png' },
                    { title: 'Ben Franklin and The Electric Keys', src: 'https://www.bupipedream.com/ac/106822/music-issue-2019-ben-franklin-and-the-electric-keys/', thumbnail: '/images/electric-keys.jpg' },
                    { title: 'A glimpse into BU’s Kanye West Club', src: 'https://www.bupipedream.com/ac/106735/my-beautiful-dark-twisted-fanbase-a-glimpse-into-bus-kanye-west-club/', thumbnail: '/images/kanye.png' },
                    { title: 'Lunchtime Sets', src: 'https://www.youtube.com/watch?v=QguixYdGx2g', thumbnail: '/images/lunchtime-sets.jpg' },
                    { title: 'natural born kissers', src: 'https://www.bupipedream.com/ac/106815/music-issue-2019-natural-born-kissers/', thumbnail: '/images/natural-born-kissers.jpg' },
                    { title: 'Laurence Elder', src: 'https://www.bupipedream.com/ac/106709/laurence-elder-brings-industry-experience-to-the-classroom/', thumbnail: '/images/laurence-elder.jpg' },
                    { title: 'Slag', src: 'https://www.bupipedream.com/ac/106803/music-issue-2019-slag/', thumbnail: '/images/slag.jpg' }
                ]
            }
        }
    };
}

function createActions(model, api) {
    return {
        onFeatureThumbnailHover,
        onLocationButtonClick,
        onMenubarToggleClick,
        onNavigateTo 
    };

    function onLocationButtonClick(location = '/') {
        m.route.set(location);
    }

    function onMenubarToggleClick() {
        const menubar = document.querySelector('[role="menubar"]');

        if (menubar) {
            model.menubar.isVisible = (model.menubar.isVisible) ? false : true;
            model.menubar.toggleText = (model.menubar.isVisible) ? 'Close' : 'Menu';
        }
    }

    function onNavigateTo(routeName, params) {
        model.routeName = routeName;
        model.params = params;

        if (model.menubar.isVisible) {
            onMenubarToggleClick();
        }
    }

    function onFeatureThumbnailHover(text = '') {
        model.pages.features.hover = text;
    }
}

function createRouteResolver(model, actions, view) {
    return model.paths.reduce(function(acc, path) {
        acc[path.route] = {
            onmatch: function(params, route) {
                actions.onNavigateTo(path.name, params);
            },
            render: function() {
                return view(model, actions);
            }
        };

        return acc;
    }, {});
}

function createView() {
    return app;

    function app(model, actions) {
        return m('div.u-dp--flex.theme--dark', [
            Menubar(model),
            Banner(model, actions),
            View(model, actions),
            Footer(model, actions)
        ]);
    }

    function View(model, actions) {
        if (model.routeName === 'home') {
            return Home(model, actions);
        }

        if (model.routeName === 'features') {
            return Features(model, actions);
        }

        if (model.routeName === 'playlists') {
            return Playlists(model, actions);
        }
    }

    function Billboard(content = '') {
        const declaration = 'h1.font--largest.offset--1.span--10';
        return m(declaration, content);
    }

    function BillboardStroke(content = '') {
        const declaration = 'span.font--larger.offset--1.span--10.stroked';
        return m(declaration, content);
    }

    function Card(content = []) {
        const declaration = 'section.u-dp--grid.grid--12.span--12';
        return m(declaration, content);
    }

    function CardVideo(content = []) {
        const declaration = 'video[autoplay="true"][loop="true"][muted=""].span--12';
        return m(declaration, content);
    }

    function Paragraph(content = '') {
        const declaration = 'p.font--larger.offset--1.span--10';
        return m(declaration, content);
    }

    function ParagraphSmall(content = '') {
        const declaration = 'p.font--base.offset--1.span--10';
        return m(declaration, content);
    }

    function VideSource(href = '#') {
        const declaration = `source[src="${ href }"][type="video/mp4"]`;
        return m(declaration);
    }

    // MENU BAR ---------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------
    function Menubar(model) {
        const declaration = (model.menubar.isVisible) ?
            '[role="menubar"].u-pos--fixed.u-dp--grid.grid--12.theme--light.open' :
            '[role="menubar"].u-pos--fixed.u-dp--grid.grid--12.theme--light';
        return m(declaration, MenubarListContainer(model));
    }

    function MenubarListContainer(model) {
        const declaration = 'div.u-dp--inline.u-pos--relative.offset--1.span--10';
        return m(declaration, MenubarList(model));
    }

    function MenubarList(model) {
        const declaration = 'ol.u-pos--absolute.u-absCenter';
        const items = model.paths.map((path) => MenubarListItem(path));
        return m(declaration, items);
    }

    function MenubarListItem({ route, name }) {
        const liDeclaration = 'li';
        const aDeclaration = `a[href="${ route }"][role="menuitem"].font--largest.stroked--hover`;
        return m(liDeclaration, m(aDeclaration, { oncreate: m.route.link }, name));
    }

    // BANNER -----------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------
    function Banner(model, actions) {
        const declaration = 'header.[role="banner"].u-pos--sticky.u-dp--grid.grid--12';
        return m(declaration, BannerNav(model, actions));
    }

    function BannerNav(model, actions) {
        const declaration = 'nav.u-dp--flex.u-flexJustify--between.offset--1.span--10';
        return m(declaration, [
            HomePointer(model, actions),
            MenuBarToggle(model, actions)
        ]);
    }

    function HomePointer(model, actions) {
        const declaration = 'button.u-border--none.u-background--none.accent.font--smaller';
        const text = model.title;
        const clickAction = () => actions.onLocationButtonClick('/');
        return m(declaration, { onclick: clickAction }, text);
    }

    function MenuBarToggle(model, actions) {
        const declaration = 'button.u-border--none.u-background--none.accent.font--smaller';
        const text = model.menubar.toggleText;
        const clickAction = () => actions.onMenubarToggleClick();
        return m(declaration, { onclick: clickAction }, text);
    }

    // FOOTER -----------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------
    function Footer(model, actions) {
        const declaration = 'footer.u-dp--grid.grid--12';
        return m(declaration, FooterNav(model, actions));
    }

    function FooterNav(model, actions) {
        const declaration = 'nav.u-dp--flex.u-flex--wrap.u-flexJustify--between.offset--1.span--10';
        const links = model.socialLinks.map((link) => FooterNavLink(link));
        return m(declaration, links);
    }

    function FooterNavLink(link) {
        const declaration = `a[href="${ link.href }"][target="_blank"].accent.font--smaller`;
        return m(declaration, link.name);
    }

    // HOME -------------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------
    function Home(model, actions) {
        const declaration = 'main.home.u-dp--grid.grid--12';
        const sections = [
            Card([
                Billboard('Welcome to Pipe Dream’s 2019 Music Issue'),
                ParagraphSmall('Here, you can check out features on student bands, music-related clubs on campus and local venues in the Binghamton area.')
            ]),
            CardVideo([
                VideSource('videos/playshoes.mp4'),
                'Your browser does not support the html 5 video tag'
            ]),
            Card([
                Paragraph('The music scene at Binghamton University and in the Binghamton area is vibrant and eclectic, but its tight-knit culture often causes it to go unheard and unseen by many. Through our features, we hope you’ll gain a new perspective on the music community made up of your peers, professors and Binghamton locals.'),
                Paragraph('Music surrounds virtually every element of college life — from beats blasting in the bars on State Street to your favorite songs to play while studying. Our writers have compiled playlists that are the perfect soundtracks to classic BU student experiences, like hanging out in the Nature Preserve. You can find them all on Spotify and play Pipe Dream’s picks on your next walk to class.')
            ]),
            CardVideo([
                VideSource('videos/stuyeyed.mp4'),
                'Your browser does not support the html 5 video tag'
            ]),
            Card([
                Paragraph('Check out our video coverage of some student-favorite music events. Most are organized by students themselves, and feature everyone from student bands to acts from across the country.'),
                BillboardStroke('Thank you, and we hope you enjoy our first Music Issue.')
            ])
        ];

        return m(declaration, sections); 
    }

    // FEATURES ---------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------
    function Features(model, actions) {
        const declaration = 'main.u-dp--grid.grid--12.features';
        const h1Text = model.pages.features.hover;
        const sections = [
            Card([
                m('div[role="feed"][aria-label="features"].u-pos--relative.span--12', model.pages.features.articles.map((article) => FeatureArticle(article, actions))),
                m('div.u-pos--fixed.u-absCenter.bgText', m('h1.font--largest.offset--1.span--10', h1Text))
            ])
        ];
        return m(declaration, sections);
    }

    function FeatureArticle(article, actions) {
        const declaration = "div.imageBox";
        return m(declaration, FeatureThumbnail(article, actions));
    }

    function FeatureThumbnail(article, actions) {
        const declaration = `a[href="${ article.src }"][target="_blank"].thumbnail.u-pos--relative`;
        const mouseenterAction = (e) => {console.log('in');actions.onFeatureThumbnailHover(article.title);}
        const mouseoutAction = (e) => {console.log('out'); actions.onFeatureThumbnailHover('');}
        return m(declaration, { onmouseenter: mouseenterAction, onmouseout: mouseoutAction }, FeatureImage(article.thumbnail));
    }

    function FeatureImage(src) {
        const declaration = `img[src="${ src }"]`;
        return m(declaration);
    }
    
    // PLAYLISTS --------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------------------
    function Playlists(model, actions) {
        const declaration = 'main.u-dp--grid.grid--12';
        const sections = [
            Card([
                Billboard('Bing Playlists'),
                PlaylistFeed(model, actions)
            ])
        ];

        return m(declaration, sections);
    }

    function PlaylistFeed(model, actions) {
        const declaration = 'section[role="feed"][aria-label="playlists"].offset--1.span--10';
        return m(
            declaration, 
            model.pages.playlists.articles.map((article) => PlaylistArticle(article))
        );
    }

    function PlaylistArticle(article) {
        const declaration = 'article.u-pos--relative.span--10';
        return m(declaration, m(`a[href="${ article.src }"][target="_blank"].stroked--hover.font--larger`, article.title));
    }
}