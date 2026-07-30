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
        source: "/blog/صرفه-جویی-در-بودجه-رفاهی-سازمان-ها",
        destination: "/blog/how-to-save-on-corporate-wellness-budgets",
        permanent: true,
      },
      {
        source: "/blog/رفاهیات-سازمانی-تخصصی-افزایش-سودآوری-و-حفظ-کارمندان",
        destination: "/blog/specialised-corporate-wellness-for-higher-profitability-and-employee-retention",
        permanent: true,
      },
      {
        source: "/blog/رفاهیات-سازمانی-چیست-تعریف-مثال-و-ضرورت-آن",
        destination: "/blog/what-is-corporate-wellness-definition-examples-and-importance",
        permanent: true,
      },
      {
        source: "/blog/ورزش-پشت-میز",
        destination: "/blog/desk-exercises",
        permanent: true,
      },
      {
        source: "/blog/رفاهیات-سازمانی-مطلوب-نسل-دهه-شصت-نسل-هزاره",
        destination: "/blog/corporate-wellness-for-millennials",
        permanent: true,
      },
      {
        source: "/blog/چگونه-مدیر-خود-را-متقاعد-کنیم",
        destination: "/blog/how-to-convince-your-manager",
        permanent: true,
      },
      {
        source: "/blog/تاثیرات-خواب-کارمندان-بر-درآمد-سازمان",
        destination: "/blog/how-employee-sleep-affects-business-revenue",
        permanent: true,
      },
      {
        source: "/blog/ضرورت-خدمات-حمایت-از-سلامت-روان-در-رفاهیات-سازمانی-بخش-دوم",
        destination: "/blog/why-mental-health-support-services-are-essential-in-corporate-wellness-part-two",
        permanent: true,
      },
      {
        source: "/blog/ضرورت-خدمات-حمایت-از-سلامت-روان-در-رفاهیات-سازمانی-بخش-اول",
        destination: "/blog/why-mental-health-support-services-are-essential-in-corporate-wellness-part-one",
        permanent: true,
      },
      {
        source: "/blog/تأثیرات-مالی-سلامت-کارمندان-بر-اقتصاد-سازمان",
        destination: "/blog/the-financial-impact-of-employee-health-on-business-performance",
        permanent: true,
      },
      {
        source: "/blog/ارزش-و-تاثیر-رفاهیات-ورزشی-در-سازمان-ها",
        destination: "/blog/the-value-and-impact-of-corporate-fitness-wellness",
        permanent: true,
      },
      {
        source: "/blog/تاثیر-رفاهیات-سازمانی-بر-جذب-و-حفظ-استعدادها",
        destination: "/blog/how-corporate-wellness-improves-talent-attraction-and-retention",
        permanent: true,
      },
      {
        source: "/blog/6-روش-قدرتمند-برای-حمایت-از-سلامت-روان-در-محل-کار",
        destination: "/blog/six-powerful-ways-to-support-mental-health-in-the-workplace",
        permanent: true,
      },
      {
        source: "/blog/ضرورت-افزودن-ورزش-در-دستور-کار-جلسات-سازمانی",
        destination: "/blog/why-exercise-should-be-part-of-organisational-meetings",
        permanent: true,
      },
      {
        source: "/blog/افزایش-بهره-وری-کارکنان-با-رفاهیات-ورزشی-سازمانی",
        destination: "/blog/boosting-employee-productivity-through-corporate-fitness-programs",
        permanent: true,
      },
      {
        source: "/blog/چگونه-از-خطرات-سلامتی-مشاغل-کم-تحرک-جلوگیری-کنیم",
        destination: "/blog/how-to-prevent-health-risks-of-sedentary-jobs",
        permanent: true,
      },
      {
        source: "/blog/راهنمای-کامل-رفاهیات-ورزشی-سازمانی-برای-مدیران-منابع-انسانی",
        destination: "/blog/complete-guide-to-corporate-fitness-wellness-for-hr-managers",
        permanent: true,
      },
      {
        source: "/blog/سلامت-کارمندان-یک-پتانسیل-قوی-برای-سودآوری-سازمان",
        destination: "/blog/employee-health-a-powerful-driver-of-business-profitability",
        permanent: true,
      },
      {
        source: "/blog/رفاهیات-سازمانی-و-تاثیر-ورزش-بر-افسردگی",
        destination: "/blog/corporate-wellness-and-the-impact-of-exercise-on-depression",
        permanent: true,
      },
      {
        source: "/blog/راهنمای-مدیران-منابع-انسانی-آیا-کارمندان-خود-را-هر-شش-ماه-بررسی-می-کنید",
        destination: "/blog/do-you-review-your-employees-every-six-months",
        permanent: true,
      },
      {
        source: "/blog/راهنمای-مدیران-منابع-انسانی-سوالات-کلیدی-برای-بررسی-شش-ماهه-کارمندان-با-مثال",
        destination: "/blog/key-questions-for-six-month-employee-reviews-with-examples",
        permanent: true,
      },
      {
        source: "/blog/ضرورت-بررسی-های-میان-دوره-ای-کارمندان-برای-مدیران-منابع-انسانی",
        destination: "/blog/why-mid-year-employee-reviews-matter-for-hr-managers",
        permanent: true,
      },
      {
        source: "/blog/طرح-ریزی-رفاهیات-سازمانی-موفق-برای-تشویق-کارمندان-به-سبک-زندگی-سالم",
        destination: "/blog/how-to-plan-a-successful-corporate-wellness-program-for-a-healthier-workforce",
        permanent: true,
      },
      {
        source: "/blog/راهنمای-جامع-تشویق-های-مؤثر-در-حوزه-سلامت-کارمندان",
        destination: "/blog/comprehensive-guide-to-effective-employee-wellness-incentives",
        permanent: true,
      },
      {
        source: "/blog/ورزش-های-گروهی-راهکاری-موثر-برای-کاهش-استرس-کارمندان",
        destination: "/blog/team-sports-an-effective-way-to-reduce-employee-stress",
        permanent: true,
      },
      {
        source: "/blog/ورزش-های-آبی-گزینه-ای-پرطرفدار-در-رفاهیات-سازمانی",
        destination: "/blog/corporate-wellness-water-sports-a-popular-choice",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

