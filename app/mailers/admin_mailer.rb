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
end