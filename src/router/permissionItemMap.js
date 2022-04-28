export const defaultValidRoutes = ["/", "/signup", "/info"];

export const menuRouteNameMap = {
  "/": "首頁",
  "/info":'個人資訊',
  "/user": "使用者管理",
  "/service": "服務管理",
  "/role": "角色管理",
  "/stadium": "場館管理",
};

export const permissionItemMap = {
  userAdd: {
    funcName: "使用者新增",
    route: "/user",
  },
  userDelete: {
    funcName: "使用者刪除",
    route: "/user",
  },
  userEdit: {
    funcName: "使用者編輯",
    route: "/user",
  },
  serviceDelete: {
    funcName: "服務刪除",
    route: "/service",
  },
  serviceAdd: {
    funcName: "服務新增",
    route: "/service",
  },
  serviceEdit: {
    funcName: "服務編輯",
    route: "/service",
  },
  roleAdd: {
    funcName: "角色新增",
    route: "/role",
  },
  roleEdit: {
    funcName: "角色編輯",
    route: "/role",
  },

  roleDelete: {
    funcName: "角色刪除",
    route: "/role",
  },
  statiumAdd: {
    funcName: "場館新增",
    route: "/stadium",
  },
  statiumEdit: {
    funcName: "場館編輯",
    route: "/stadium",
  },
  statiumDelete: {
    funcName: "場館刪除",
    route: "/stadium",
  },
};

export const permissionItemNameMap = Object.keys(permissionItemMap).reduce(
  (obj, key) => ({ ...obj, [key]: permissionItemMap[key].funcName }),
  {}
);

export const permissionItemRouteMap = Object.keys(permissionItemMap).reduce(
  (obj, key) => ({ ...obj, [key]: permissionItemMap[key].route }),
  {}
);
