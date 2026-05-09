export const R = {
  auth: {
    prefix: "/auth/login",
  },
  protected: {
    prefix :"/protected",
    admin: {
      prefix: "/protected/dashboard",
      user: "/protected/user",
      userAdd: "/protected/user/add",
      customers: "/protected/customers",
      customersAdd: "/protected/customers/add",
    },
    superAdmin: {
      prefix: "/protected/super_admin/dashboard",
      organizations: "/protected/super_admin/organizations",
      customers: "/protected/super_admin/customers",
      logs: "/protected/super_admin/logs",
    },
  },
};
