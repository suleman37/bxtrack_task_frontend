export type CustomerModel = {
  id: number;
  name: string;
  email: string;
  phone: string;
  assignedToName: string;
  status?: string;
};

export type CustomerPaginationModel = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type CustomerListModel = {
  customers: CustomerModel[];
  pagination: CustomerPaginationModel;
};
