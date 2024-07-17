import "dotenv/config";

export default {
  expo: {
    name: "mobile",
    slug: "mobile",
    extra: {
      clerkApiKey: process.env.CLERK_API_KEY,
      clerkFrontendApi: process.env.CLERK_FRONTEND_API,
    },
  },
};
