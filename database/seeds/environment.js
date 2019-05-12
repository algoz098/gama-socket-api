// const bcrypt = require('bcrypt-nodejs');
// const faker = require('faker');

module.exports = {
    model: 'environment',
    documents: [
        {
            name: 'webgs',
            default: true,
            urls: 'webgs.com.br',

            layout:{
                component: 'q-layout',
                type: 'layout',

                props: {
                    view: "lHh lpr lFf",
                    class: "q-mt-xl"
                }
            },

            navbar:{
                component: 'common-navbar',
                type: 'navbar',

                props: {
                    logoSrc: "https://via.placeholder.com/100x25",
                    headerClass: "bg-white text-primary shadow-1"
                },
            },

            footer:{
                component: 'common-footer',
                type: 'footer',

                props: {
                },
            },
            
            colors: [
                { type: "primary",   value: "#027be3" },
                { type: "secondary", value: "#26a69a" },
                { type: "accent",    value: "#9c27b0" },
                { type: "positive",  value: "#21ba45" },
                { type: "negative",  value: "#c10015" },
                { type: "info",      value: "#31ccec" },
                { type: "warning",   value: "#f2c037" },
            ],

            pages: [
                {
                    route: '/',
                    components: [
                        {
                            component: 'common-simple-text',
                            type: 'component',

                            props: {
                                titleClass: "text-center",
                                textClass: "text-center",
                                title: "Welcome to example Gama!",
                                text: "Text"
                            },
                        }
                    ]
                },

                {
                    title: "Test",
                    route: '/test',
                    components: [
                        {
                            component: 'common-simple-text',
                            type: 'component',

                            props: {
                                titleClass: "text-center",
                                textClass: "text-center",
                                title: "Welcome to test!",
                                text: "Text"
                            },
                        }
                    ]
                }
            ]
        }
    ]
};