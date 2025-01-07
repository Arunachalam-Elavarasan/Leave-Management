export type ActionType = {
  iconName: string;
  iconColor: string;
  name: string;
};

export type UserListItem = {
  label: string;
  accessor: string;
  actions?: ActionType[];
  template?: any;
};

export type FormHeaderAction = {
  label: string;
  action: 'applyLeave' | 'save' | 'cancel';
  color: string;
};
