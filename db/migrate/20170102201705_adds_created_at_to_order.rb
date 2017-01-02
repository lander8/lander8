class AddsCreatedAtToOrder < ActiveRecord::Migration[5.0]
  def change
  	add_column :orders, :order_created_at, :datetime
  end
end
