module.exports = {
    pathPrefix: '/',
    siteMetadata: require('./site-metadata.json'),
    plugins: [
        `gatsby-plugin-react-helmet`,
        `gatsby-source-data`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`,
            },
        },
        `gatsby-plugin-sass`, // ✅ QUI: stringa semplice, non oggetto
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [`gatsby-remark-component`],
            },
        },
        {
            resolve: `gatsby-remark-page-creator`,
            options: {
                // Puoi aggiungere opzioni se servono
            },
        },
        {
            resolve: `@stackbit/gatsby-plugin-menus`,
            options: {
                sourceUrlPath: `fields.url`,
                pageContextProperty: `menus`,
                menus: require('./src/data/menus.json'),
            },
        },
    ],
};
