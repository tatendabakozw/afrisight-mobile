export const AUTH_ROUTES = {
  REFRESH_TOKEN: "/auth/token/refresh",
  GOOGLE_SIGNIN: "/auth/oauth/google/callback",
  USER_OBJECT: "/auth/profile",
  USER_PROFILE: "/profile",
  DOES_USER_EXIST: "/auth/start_auth_flow",
  VERIFY_EMAIL: "/auth/otp/email/verify",
  RESEND_EMAIL_OTP: "/auth/otp/email/resend",
  VERIFY_PHONE: "/auth/otp/email/verify",
  RESEND_PHONE_OTP: "/auth/otp/email/resend",
  PHONE_SIGNIN: "/auth/login/phone",
  PASSWORD_SIGNIN: "/auth/login/email",
  EMAIL_REGISTRATION: "/auth/register/email",
  PRIVACY_SETTINGS: "/profile/privacy",
  SURVEY_PREFERENCES: "/profile/survey-preferences",
  WITHDRAWAL_METHODS: "/profile/withdrawal-methods",
  CHANGE_PASSWORD: "/profile/password",
  EARNINGS_DASHBOARD: "/profile/earnings-dashboard",
  NOTIFICATION_SETTINGS: "/profile/notification-settings",
  REMOVE_WITHDRAWAL_METHOD: "/profile/withdrawal-methods",
  ADD_WITHDRAWAL_METHOD: "/profile/withdrawal-methods/add",
  UPDATE_WITHDRAWAL_METHOD: "/profile/withdrawal-methods/update",
  SET_DEFAULT_WITHDRAWAL_METHOD: "/profile/withdrawal-methods/set-default",
  WITHDRAWAL_HISTORY: '/withdrawal-history',
  UPDATE_PROFILE: (id: string) => `/profile/${id}`,
};

export const GIG_ROUTES = {
  GET_ALL_GIGS: "/survey/",
  GET_GIG_BY_ID: (id: string) => `/survey/${id}`,
  START_RESPONDING: (id: string) => `/survey/${id}/response/start`,
  SUBMIT_SURVEY_RESPONSES: (id: string) => `/survey/${id}/response/submit`,
  GET_SURVEY_RESPONSE_HAS_STARTED: (id: string) => `/survey/${id}/response/has-started`,
  GET_SURVEY_RESPONSES: (id: string, userId: string) => `/survey/${id}/response/user/${userId}`,

};

export const FORM_ROUTES = {
  GET_FORM_BY_ID: (id: string) => `/form/${id}`,
};

export const LEADERBOARD_ROUTES = {
  GET_LEADERBOARD: "/leaderboard",
  GET_LEADERBOARD_RANK: "/leaderboard/rank",
};
