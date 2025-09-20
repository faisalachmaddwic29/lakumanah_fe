export interface Popup {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  file_path: string;
  url: string;
}

export interface PopupsResponse {
  popups: Popup[] | [];
}

export interface PopupResponse {
  popup: Popup;
}
