import {Configuration} from "../model/Configuration";

export const CONFIGURATIONS: Configuration[] = [
        {
            id: 1,
            name: 'Samochód',
            type: '',
            components: [
                {
                    id: 11,
                    parentId: 1,
                    name: 'Nadwozie',
                    type: '',
                    description: 'nadwozie samonośne, płyta podłogowa',
                    components: [
                        {
                            id: 111,
                            parentId: 11,
                            name: 'Elementy zewnętrzne nadwozia',
                            items: [
                                {
                                    id: 1111,
                                    parentId: 111,
                                    name: 'karoseria'
                                }, {
                                    id: 1112,
                                    parentId: 111,
                                    name: 'błotnik'
                                }
                            ]
                        }, {
                            id: 112,
                            parentId: 11,
                            name: 'Elementy wnętrza',
                            items: [
                                {
                                    id: 1121,
                                    parentId: 112,
                                    name: 'deska rozdzielcza'
                                }, {
                                    id: 1122,
                                    parentId: 112,
                                    name: 'fotele'
                                }
                            ]
                        }
                    ]
                }, {
                    id: 12,
                    parentId: 1,
                    name: 'Podwozie',
                    description: 'rama samochodu',
                    type: '',
                    components: [
                        {
                            id: 111,
                            parentId: 11,
                            name: 'Układ napędowy',
                            items: [
                                {
                                    id: 1111,
                                    parentId: 111,
                                    name: 'sprzęgło'
                                }, {
                                    id: 1112,
                                    parentId: 111,
                                    name: 'skrzynia biegów'
                                }, {
                                    id: 1112,
                                    parentId: 111,
                                    name: 'reduktor terenowy'
                                }, {
                                    id: 1112,
                                    parentId: 111,
                                    name: 'wał napędowy'
                                }
                            ]
                        }, {
                            id: 111,
                            parentId: 11,
                            name: 'Układ hamulcowy',
                            items: [
                                {
                                    id: 1111,
                                    parentId: 111,
                                    name: 'hamulec roboczy'
                                }, {
                                    id: 1112,
                                    parentId: 111,
                                    name: 'pompa hamulcowa'
                                }
                            ]
                        }, {
                            id: 111,
                            parentId: 11,
                            name: 'Zawieszenie',
                            items: [
                                {
                                    id: 1111,
                                    parentId: 111,
                                    name: 'amortyzator'
                                }, {
                                    id: 1112,
                                    parentId: 111,
                                    name: 'sprężyna'
                                }
                            ]
                        }
                    ]
                }, {
                    id: 11,
                    parentId: 1,
                    name: 'Silnik',
                    type: '',
                    items: [
                        {
                            id: 1111,
                            parentId: 111,
                            name: 'tłok'
                        }, {
                            id: 1111,
                            parentId: 111,
                            name: 'głowica silnika'
                        }, {
                            id: 1111,
                            parentId: 111,
                            name: 'blok silnika'
                        }, {
                            id: 1111,
                            parentId: 111,
                            name: 'turbosprężarka'
                        }, {
                            id: 1111,
                            parentId: 111,
                            name: 'koło zamachowe'
                        }, {
                            id: 1112,
                            parentId: 111,
                            name: 'korbowód'
                        }
                    ]
                }, {
                    id: 11,
                    parentId: 1,
                    name: 'Inne',
                    type: '',
                    components: [
                        {
                            id: 111,
                            parentId: 11,
                            name: 'Instalacja elektryczna',
                            items: [
                                {
                                    id: 1111,
                                    parentId: 111,
                                    name: 'alternator'
                                }, {
                                    id: 1112,
                                    parentId: 111,
                                    name: 'prądnica'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
;
