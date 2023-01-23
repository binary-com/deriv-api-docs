export interface IUserNavbarItemProps {
  is_logged_in: boolean;
  logout?: () => void;
  authUrl: string;
}
