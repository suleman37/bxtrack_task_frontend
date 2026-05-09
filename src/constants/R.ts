export const R = {
  auth: {
    prefix: "/auth/login",
  },
  protected: {
    prefix :"/protected",
    admin: {
      prefix: "/protected/dashboard",
      dashboardById: (id: number) => `/protected/dashboard/${id}`,
      user: "/protected/user",
      userAdd: "/protected/user/add",
      customers: "/protected/customers",
      customersAdd: "/protected/customers/add",
    },
    superAdmin: {
      prefix: "/protected/super_admin/dashboard",
      organizations: "/protected/super_admin/organizations",
      organizationsAdd: "/protected/super_admin/organizations/add",
      customers: "/protected/super_admin/customers",
      logs: "/protected/super_admin/logs",
    },
  },
};
