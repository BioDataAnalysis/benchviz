
// FIXME: re-add when we will add environment variables to launch the application
// export default {
//     port: process.env.BENCHVIZ_PORT,
//     mode: process.env.BENCHVIZ_MODE,
//     api_url: process.env.BENCHVIZ_API_URL,
//     session_secret: process.env.BENCHVIZ_SESSION_SECRET || "",
// };

export default {
    port: 3000,
    mode: "development",
    api_url: "/api/v1",
    session_secret: process.env.BENCHVIZ_SESSION_SECRET || "my-development-secret",
};
