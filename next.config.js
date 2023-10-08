/* next.config.js  */
module.exports = {
    i18n: {
        locales: ["fr"],
        defaultLocale: "fr",
    },

    async redirects() {
        return [
            {
                source: "/login-native",
                destination: "/#contacter",
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "mldxyasghmmynjxewzuv.supabase.co",
                port: "",
                pathname: "/storage/v1/object/public/**",
            },
            {
                protocol: "https",
                hostname: "2.gravatar.com",
                port: "",
                pathname: "/avatar/**",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/u/**",
            },
        ],
    },
};
