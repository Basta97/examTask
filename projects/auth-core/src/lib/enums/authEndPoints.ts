export class AuthEndPoints {
  static readonly BASE_URL = 'https://exam-app.elevate-bootcamp.cloud/api/auth';
  static readonly SEND_EMAIL_VERIFICATION = `${AuthEndPoints.BASE_URL}/send-email-verification`;
  static readonly CONFIRM_EMAIL_VERIFICATION = `${AuthEndPoints.BASE_URL}/confirm-email-verification`;
  static readonly REGISTER = `${AuthEndPoints.BASE_URL}/register`;
  static readonly LOGIN = `${AuthEndPoints.BASE_URL}/login`;
  static readonly FORGOT_PASSWORD = `${AuthEndPoints.BASE_URL}/forgot-password`;
  static readonly RESET_PASSWORD = `${AuthEndPoints.BASE_URL}/reset-password`;
}
