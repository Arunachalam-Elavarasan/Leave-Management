export type HeaderActions = {
  label: string;
  action: string;
  color: string;
}[];

export type BtnActions = 'view' | 'delete' | 'edit';

export type TableAction = { action: BtnActions; item: any };

export type ListHeaderAction = {
  label: string;
  action: 'applyLeave' | 'save' | 'cancel';
  color: string;
  type?: 'submit' | 'button';
};
