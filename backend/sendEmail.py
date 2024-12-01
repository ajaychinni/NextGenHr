import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(sender_email: str, sender_password: str, recipient_email: str, subject: str, body: str) -> bool:
    """
    Sends an email using Gmail's SMTP server.
    """
    try:
        # Set up the email message
        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = recipient_email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        # Send email via Gmail's SMTP
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()  # Start TLS
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, message.as_string())

        print(f"Email successfully sent to {recipient_email}")
        return True

    except smtplib.SMTPAuthenticationError:
        print("Authentication failed. Check your email and app password.")
        return False
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
