class UserMailer < BaseMandrillMailer
  def welcome(user_id)
    user = User.find(user_id)
    subject = "Welcome to Lander8!"
    merge_vars = {
      "NAME" => user.name
    }
    body = mandrill_template("welcome", merge_vars)

    send_mail(user.email, subject, body)
  end
end