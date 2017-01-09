class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :websites

  after_create :send_welcome_email

  def send_welcome_email
  	UserMailer.welcome(id).deliver
  end

end
