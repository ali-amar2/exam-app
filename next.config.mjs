// next.config.js
const nextConfig = {
  images: {
    loader: "default",
    remotePatterns: [
      { protocol: "https", hostname: "exam-app.elevate-bootcamp.cloud", pathname: "/storage/**" },
      { protocol: "https", hostname: "www.elevate-bootcamp.cloud", pathname: "/storage/**" },
      { protocol: "https", hostname: "elevate-bootcamp.cloud", pathname: "/storage/**" },
    ],
  },
};
export default nextConfig;