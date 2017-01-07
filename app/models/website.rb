class Website < ApplicationRecord
	belongs_to :user
	has_many :orders
	has_many :views
end
