// eslint-disable-next-line import/no-anonymous-default-export
export default {
  header: {
    self: {},
    items: [
    ]
  },
  aside: {
    self: {},
    items: [
      { section: "my account" },
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot"
      },
      { section: "general" },
      {
        title: "manage places",
        root: true,
        icon: "flaticon-map-location",
        page: "places"
      },
      {
        title: "manage locations",
        root: true,
        icon: "flaticon2-world",
        page: "locations"
      },
      {
        title: "manage users",
        root: true,
        icon: "flaticon-users",
        page: "users"
      },
      {
        title: "manage sports",
        root: true,
        icon: "flaticon-stopwatch",
        page: "sports"
      },
      { section: "resource" },
      {
        title: "manage media",
        root: true,
        icon: "flaticon-folder-1",
        page: "media"
      },
      { section: "settings" },
      {
        title: "settings",
        root: true,
        icon: "flaticon-settings-1",
        page: "settings"
      },
    ]
  }
};
