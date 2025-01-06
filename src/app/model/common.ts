export type HeaderActions = {
  label: string;
  action: string;
  color: string;
}[];

export type BtnActions = 'view' | 'delete' | 'edit';

export type TableAction = { action: BtnActions; item: any };
