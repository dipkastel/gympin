export const AuthApi = {
  // BASEURL: "https://api.gympin.ir/",
  BASEURL: "http://localhost:8080/api/",
  // BASEURL: "http://192.168.1.108:8080/api/",
};

export const ArticleApi = {
  query: "v1/article/query",
  getById: "v1/article/getById",
  getBySlug: "v1/article/getBySlug",
};

export const LinkApi = {
  getByCode: "v1/link/getByCode",
};

export const AccountApi = {
  requestRegisterAdvise: "v1/account/requestRegisterAdvise",
  requestPublicMessage: "v1/account/requestPublicMessage",
  requestRegisterCorporate: "v1/account/requestRegisterCorporate",
};
