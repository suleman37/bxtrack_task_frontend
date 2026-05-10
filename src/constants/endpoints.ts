export const endpoints = {
  auth: {
    login: "/login",
  },
  users: {
    getAll: "/users",
    getById: "/users/:id",
    create: "/users",
  },
  customers: {
    getAll: "/customers",
    getById: "/customers/:id",
    create: "/customers",
    delete: "/customers/:id",
    getNotes: "/customers/:id/notes",
    createNote: "/customers/:id/notes",
  },
  logs: {
    getAll: "/logs",
  },
};
