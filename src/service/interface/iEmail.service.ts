export interface IEmailService {
  sendEmailLinkVerify({
    html,
    toEmail,
    subject,
    text,
  }: {
    html: any;
    toEmail: string;
    subject: string;
    text: string;
  }): Promise<any>;

  sendEmailToken({ email }: { email: string }): Promise<any>;
}
