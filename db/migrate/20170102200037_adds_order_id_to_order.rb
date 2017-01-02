class AddsOrderIdToOrder < ActiveRecord::Migration[5.0]
  def change
  	add_column :orders, :website_order_id, :string
  end
end
