import {RouteInfo} from "../sidebar.component";

export const ROUTES_ADMIN: RouteInfo[] = [
    {
        path: '/ci-type-manager',
        title: 'Ci Type Manager',
        icon: 'dashboard'
    }, {
        path: '/relations',
        title: 'Relationship Manager',
        icon: 'person'
    // }, {
    //     path: '/infrastructure-settings',
    //     title: 'Infrastructure Settings',
    //     icon: 'content_paste'
    }, {
        path: '/configuration',
        title: 'Configuration',
        icon: 'build'
    }, {
        path: '/discovery',
        title: 'Discovery',
        icon: 'library_books'
    }, {
        path: '/search',
        title: 'Search',
        icon: 'search'
    }
];
// relacje między ci typami i  graf z relacjami
// skanowanie
