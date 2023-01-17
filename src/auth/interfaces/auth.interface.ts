// auth.controller, auth.serviceで使用するデータ型を定義する

export interface Msg {
  message: string;
}

export interface Csrf {
  csrfToken: string;
}

export interface Jwt {
  accessToken: string;
}
