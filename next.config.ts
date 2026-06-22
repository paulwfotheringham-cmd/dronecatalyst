import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/testflighthub", destination: "/internaldashboard", permanent: true },
      { source: "/testflighthub/:path*", destination: "/internaldashboard", permanent: true },
      { source: "/crm", destination: "/internaldashboard?view=crm", permanent: false },
      { source: "/messaging", destination: "/internaldashboard?view=messaging", permanent: false },
      { source: "/files", destination: "/internaldashboard?view=files", permanent: false },
      { source: "/users", destination: "/internaldashboard?view=users", permanent: false },
      { source: "/telemetry", destination: "/internaldashboard?view=telemetry", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
