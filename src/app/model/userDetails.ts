export type ActionType = {
  iconName: string;
  iconColor: string;
  name: string;
};

export type UserListItem = {
  label: string;
  accessor: string;
  actions?: ActionType[];
};
