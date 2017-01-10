class AdminMailer < BaseMandrillMailer
  def send_bug_report(user_id, message)
    user = User.find(user_id)
    subject = "Bug Report"
    to = "hello@lander8.com"
    merge_vars = {
      "NAME" => user.name,
      "EMAIL" => user.email,
      "MESSAGE" => message
    }
    body = mandrill_template("bug", merge_vars)

    send_admin_mail(user.email, to, subject, body)
  end

  def send_contact_email(user_id, message)
    user = User.find(user_id)
    subject = "Online Contact"
    to = "hello@lander8.com"
    merge_vars = {
      "NAME" => user.name,
      "MESSAGE" => message
    }
    body = mandrill_template("contact", merge_vars)

    send_admin_mail(user.email, to, subject, body)
  end
end