class CreateOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :orders do |t|
    	t.float :total 
    	t.float :subtotal
    	t.float :tax_total
    	t.float :shipping_total
    	t.integer :website_id
      t.integer :website_user_id
      t.timestamps
    end
  end
end
