// eslint-disable-next-line import/no-anonymous-default-export
export default {
  header: {
    self: {},
    items: [],
  },
  aside: {
    self: {},
    items: [
      { section: "دسترسی سریع" },
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot",
      },
      { section: "مدیریت" },
      {
        title: "manage places",
        root: true,
        icon: "flaticon-map-location",
        translate: "MENU.MANAGE_PLACES",
        page: "places",
      },
      {
        title: "manage events",
        root: true,
        icon: "flaticon-map-location",
        translate: "MENU.MANAGE_EVENTS",
        page: "events",
      },
      { section: "نمایش" },
      {
        title: "manage HomePage",
        root: true,
        icon: "flaticon-home",
        translate: "MENU.MANAGE_HOMEPAGE",
        page: "homePage",
      },
      { section: "مدیا" },
      {
        title: "manage media",
        root: true,
        icon: "flaticon-folder-1",
        translate: "MENU.MANAGE_MEDIA",
        page: "media",
      },
      { section: "تنظیمات" },
      {
        title: "settings",
        root: true,
        icon: "flaticon-settings-1",
        translate: "MENU.SETTINGS",
        page: "settings",
      },
    ],
  },
};
