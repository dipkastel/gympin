import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ["./src/styles"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.gympin.ir",
      }
    ],
  },
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blog/%D8%B5%D8%B1%D9%81%D9%87-%D8%AC%D9%88%DB%8C%DB%8C-%D8%AF%D8%B1-%D8%A8%D9%88%D8%AF%D8%AC%D9%87-%D8%B1%D9%81%D8%A7%D9%87%DB%8C-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86-%D9%87%D8%A7",
        destination: "/blog/how-to-save-on-corporate-wellness-budgets",
        permanent: true,
      },
      {
        source: "/blog/%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D8%AA%D8%AE%D8%B5%D8%B5%DB%8C-%D8%A7%D9%81%D8%B2%D8%A7%DB%8C%D8%B4-%D8%B3%D9%88%D8%AF%D8%A2%D9%88%D8%B1%DB%8C-%D9%88-%D8%AD%D9%81%D8%B8-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86",
        destination: "/blog/specialised-corporate-wellness-for-higher-profitability-and-employee-retention",
        permanent: true,
      },
      {
        source: "/blog/%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%DA%86%DB%8C%D8%B3%D8%AA-%D8%AA%D8%B9%D8%B1%DB%8C%D9%81-%D9%85%D8%AB%D8%A7%D9%84-%D9%88-%D8%B6%D8%B1%D9%88%D8%B1%D8%AA-%D8%A2%D9%86",
        destination: "/blog/what-is-corporate-wellness-definition-examples-and-importance",
        permanent: true,
      },
      {
        source: "/blog/%D9%88%D8%B1%D8%B2%D8%B4-%D9%BE%D8%B4%D8%AA-%D9%85%DB%8C%D8%B2",
        destination: "/blog/desk-exercises",
        permanent: true,
      },
      {
        source: "/blog/%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D9%85%D8%B7%D9%84%D9%88%D8%A8-%D9%86%D8%B3%D9%84-%D8%AF%D9%87%D9%87-%D8%B4%D8%B5%D8%AA-%D9%86%D8%B3%D9%84-%D9%87%D8%B2%D8%A7%D8%B1%D9%87",
        destination: "/blog/corporate-wellness-for-millennials",
        permanent: true,
      },
      {
        source: "/blog/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D9%85%D8%AF%DB%8C%D8%B1-%D8%AE%D9%88%D8%AF-%D8%B1%D8%A7-%D9%85%D8%AA%D9%82%D8%A7%D8%B9%D8%AF-%DA%A9%D9%86%DB%8C%D9%85",
        destination: "/blog/how-to-convince-your-manager",
        permanent: true,
      },
      {
        source: "/blog/%D8%AA%D8%A7%D8%AB%DB%8C%D8%B1%D8%A7%D8%AA-%D8%AE%D9%88%D8%A7%D8%A8-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86-%D8%A8%D8%B1-%D8%AF%D8%B1%D8%A2%D9%85%D8%AF-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86",
        destination: "/blog/how-employee-sleep-affects-business-revenue",
        permanent: true,
      },
      {
        source: "/blog/%D8%B6%D8%B1%D9%88%D8%B1%D8%AA-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%AD%D9%85%D8%A7%DB%8C%D8%AA-%D8%A7%D8%B2-%D8%B3%D9%84%D8%A7%D9%85%D8%AA-%D8%B1%D9%88%D8%A7%D9%86-%D8%AF%D8%B1-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D8%A8%D8%AE%D8%B4-%D8%AF%D9%88%D9%85",
        destination: "/blog/why-mental-health-support-services-are-essential-in-corporate-wellness-part-two",
        permanent: true,
      },
      {
        source: "/blog/%D8%B6%D8%B1%D9%88%D8%B1%D8%AA-%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%AD%D9%85%D8%A7%DB%8C%D8%AA-%D8%A7%D8%B2-%D8%B3%D9%84%D8%A7%D9%85%D8%AA-%D8%B1%D9%88%D8%A7%D9%86-%D8%AF%D8%B1-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D8%A8%D8%AE%D8%B4-%D8%A7%D9%88%D9%84",
        destination: "/blog/why-mental-health-support-services-are-essential-in-corporate-wellness-part-one",
        permanent: true,
      },
      {
        source: "/blog/%D8%AA%D8%A3%D8%AB%DB%8C%D8%B1%D8%A7%D8%AA-%D9%85%D8%A7%D9%84%DB%8C-%D8%B3%D9%84%D8%A7%D9%85%D8%AA-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86-%D8%A8%D8%B1-%D8%A7%D9%82%D8%AA%D8%B5%D8%A7%D8%AF-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86",
        destination: "/blog/the-financial-impact-of-employee-health-on-business-performance",
        permanent: true,
      },
      {
        source: "/blog/%D8%A7%D8%B1%D8%B2%D8%B4-%D9%88-%D8%AA%D8%A7%D8%AB%DB%8C%D8%B1-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D9%88%D8%B1%D8%B2%D8%B4%DB%8C-%D8%AF%D8%B1-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86-%D9%87%D8%A7%0D%0A%0D%0A",
        destination: "/blog/the-value-and-impact-of-corporate-fitness-wellness",
        permanent: true,
      },
      {
        source: "/blog/%D8%AA%D8%A7%D8%AB%DB%8C%D8%B1-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D8%A8%D8%B1-%D8%AC%D8%B0%D8%A8-%D9%88-%D8%AD%D9%81%D8%B8-%D8%A7%D8%B3%D8%AA%D8%B9%D8%AF%D8%A7%D8%AF%D9%87%D8%A7",
        destination: "/blog/how-corporate-wellness-improves-talent-attraction-and-retention",
        permanent: true,
      },
      {
        source: "/blog/6-%D8%B1%D9%88%D8%B4-%D9%82%D8%AF%D8%B1%D8%AA%D9%85%D9%86%D8%AF-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%AD%D9%85%D8%A7%DB%8C%D8%AA-%D8%A7%D8%B2-%D8%B3%D9%84%D8%A7%D9%85%D8%AA-%D8%B1%D9%88%D8%A7%D9%86-%D8%AF%D8%B1-%D9%85%D8%AD%D9%84-%DA%A9%D8%A7%D8%B1",
        destination: "/blog/six-powerful-ways-to-support-mental-health-in-the-workplace",
        permanent: true,
      },
      {
        source: "/blog/%D8%B6%D8%B1%D9%88%D8%B1%D8%AA-%D8%A7%D9%81%D8%B2%D9%88%D8%AF%D9%86-%D9%88%D8%B1%D8%B2%D8%B4-%D8%AF%D8%B1-%D8%AF%D8%B3%D8%AA%D9%88%D8%B1-%DA%A9%D8%A7%D8%B1-%D8%AC%D9%84%D8%B3%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C",
        destination: "/blog/why-exercise-should-be-part-of-organisational-meetings",
        permanent: true,
      },
      {
        source: "/blog/%D8%A7%D9%81%D8%B2%D8%A7%DB%8C%D8%B4-%D8%A8%D9%87%D8%B1%D9%87-%D9%88%D8%B1%DB%8C-%DA%A9%D8%A7%D8%B1%DA%A9%D9%86%D8%A7%D9%86-%D8%A8%D8%A7-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D9%88%D8%B1%D8%B2%D8%B4%DB%8C-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C",
        destination: "/blog/boosting-employee-productivity-through-corporate-fitness-programs",
        permanent: true,
      },
      {
        source: "/blog/%DA%86%DA%AF%D9%88%D9%86%D9%87-%D8%A7%D8%B2-%D8%AE%D8%B7%D8%B1%D8%A7%D8%AA-%D8%B3%D9%84%D8%A7%D9%85%D8%AA%DB%8C-%D9%85%D8%B4%D8%A7%D8%BA%D9%84-%DA%A9%D9%85-%D8%AA%D8%AD%D8%B1%DA%A9-%D8%AC%D9%84%D9%88%DA%AF%DB%8C%D8%B1%DB%8C-%DA%A9%D9%86%DB%8C%D9%85",
        destination: "/blog/how-to-prevent-health-risks-of-sedentary-jobs",
        permanent: true,
      },
      {
        source: "/blog/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%DA%A9%D8%A7%D9%85%D9%84-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D9%88%D8%B1%D8%B2%D8%B4%DB%8C-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%85%D8%AF%DB%8C%D8%B1%D8%A7%D9%86-%D9%85%D9%86%D8%A7%D8%A8%D8%B9-%D8%A7%D9%86%D8%B3%D8%A7%D9%86%DB%8C",
        destination: "/blog/complete-guide-to-corporate-fitness-wellness-for-hr-managers",
        permanent: true,
      },
      {
        source: "/blog/%D8%B3%D9%84%D8%A7%D9%85%D8%AA-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86-%DB%8C%DA%A9-%D9%BE%D8%AA%D8%A7%D9%86%D8%B3%DB%8C%D9%84-%D9%82%D9%88%DB%8C-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%B3%D9%88%D8%AF%D8%A2%D9%88%D8%B1%DB%8C-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86",
        destination: "/blog/employee-health-a-powerful-driver-of-business-profitability",
        permanent: true,
      },
      {
        source: "/blog/%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D9%88-%D8%AA%D8%A7%D8%AB%DB%8C%D8%B1-%D9%88%D8%B1%D8%B2%D8%B4-%D8%A8%D8%B1-%D8%A7%D9%81%D8%B3%D8%B1%D8%AF%DA%AF%DB%8C",
        destination: "/blog/corporate-wellness-and-the-impact-of-exercise-on-depression",
        permanent: true,
      },
      {
        source: "/blog/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D9%85%D8%AF%DB%8C%D8%B1%D8%A7%D9%86-%D9%85%D9%86%D8%A7%D8%A8%D8%B9-%D8%A7%D9%86%D8%B3%D8%A7%D9%86%DB%8C-%D8%A2%DB%8C%D8%A7-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86-%D8%AE%D9%88%D8%AF-%D8%B1%D8%A7-%D9%87%D8%B1-%D8%B4%D8%B4-%D9%85%D8%A7%D9%87-%D8%A8%D8%B1%D8%B1%D8%B3%DB%8C-%D9%85%DB%8C-%DA%A9%D9%86%DB%8C%D8%AF",
        destination: "/blog/do-you-review-your-employees-every-six-months",
        permanent: true,
      },
      {
        source: "/blog/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D9%85%D8%AF%DB%8C%D8%B1%D8%A7%D9%86-%D9%85%D9%86%D8%A7%D8%A8%D8%B9-%D8%A7%D9%86%D8%B3%D8%A7%D9%86%DB%8C-%D8%B3%D9%88%D8%A7%D9%84%D8%A7%D8%AA-%DA%A9%D9%84%DB%8C%D8%AF%DB%8C-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%A8%D8%B1%D8%B1%D8%B3%DB%8C-%D8%B4%D8%B4-%D9%85%D8%A7%D9%87%D9%87-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86-%D8%A8%D8%A7-%D9%85%D8%AB%D8%A7%D9%84",
        destination: "/blog/key-questions-for-six-month-employee-reviews-with-examples",
        permanent: true,
      },
      {
        source: "/blog/%D8%B6%D8%B1%D9%88%D8%B1%D8%AA-%D8%A8%D8%B1%D8%B1%D8%B3%DB%8C-%D9%87%D8%A7%DB%8C-%D9%85%DB%8C%D8%A7%D9%86-%D8%AF%D9%88%D8%B1%D9%87-%D8%A7%DB%8C-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%85%D8%AF%DB%8C%D8%B1%D8%A7%D9%86-%D9%85%D9%86%D8%A7%D8%A8%D8%B9-%D8%A7%D9%86%D8%B3%D8%A7%D9%86%DB%8C",
        destination: "/blog/why-mid-year-employee-reviews-matter-for-hr-managers",
        permanent: true,
      },
      {
        source: "/blog/%D8%B7%D8%B1%D8%AD-%D8%B1%DB%8C%D8%B2%DB%8C-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%D9%85%D9%88%D9%81%D9%82-%D8%A8%D8%B1%D8%A7%DB%8C-%D8%AA%D8%B4%D9%88%DB%8C%D9%82-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86-%D8%A8%D9%87-%D8%B3%D8%A8%DA%A9-%D8%B2%D9%86%D8%AF%DA%AF%DB%8C-%D8%B3%D8%A7%D9%84%D9%85",
        destination: "/blog/how-to-plan-a-successful-corporate-wellness-program-for-a-healthier-workforce",
        permanent: true,
      },
      {
        source: "/blog/%D8%B1%D8%A7%D9%87%D9%86%D9%85%D8%A7%DB%8C-%D8%AC%D8%A7%D9%85%D8%B9-%D8%AA%D8%B4%D9%88%DB%8C%D9%82-%D9%87%D8%A7%DB%8C-%D9%85%D8%A4%D8%AB%D8%B1-%D8%AF%D8%B1-%D8%AD%D9%88%D8%B2%D9%87-%D8%B3%D9%84%D8%A7%D9%85%D8%AA-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86",
        destination: "/blog/comprehensive-guide-to-effective-employee-wellness-incentives",
        permanent: true,
      },
      {
        source: "/blog/%D9%88%D8%B1%D8%B2%D8%B4-%D9%87%D8%A7%DB%8C-%DA%AF%D8%B1%D9%88%D9%87%DB%8C-%D8%B1%D8%A7%D9%87%DA%A9%D8%A7%D8%B1%DB%8C-%D9%85%D9%88%D8%AB%D8%B1-%D8%A8%D8%B1%D8%A7%DB%8C-%DA%A9%D8%A7%D9%87%D8%B4-%D8%A7%D8%B3%D8%AA%D8%B1%D8%B3-%DA%A9%D8%A7%D8%B1%D9%85%D9%86%D8%AF%D8%A7%D9%86",
        destination: "/blog/team-sports-an-effective-way-to-reduce-employee-stress",
        permanent: true,
      },
      {
        source: "/blog/%D9%88%D8%B1%D8%B2%D8%B4-%D9%87%D8%A7%DB%8C-%D8%A2%D8%A8%DB%8C-%DA%AF%D8%B2%DB%8C%D9%86%D9%87-%D8%A7%DB%8C-%D9%BE%D8%B1%D8%B7%D8%B1%D9%81%D8%AF%D8%A7%D8%B1-%D8%AF%D8%B1-%D8%B1%D9%81%D8%A7%D9%87%DB%8C%D8%A7%D8%AA-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C",
        destination: "/blog/corporate-wellness-water-sports-a-popular-choice",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

