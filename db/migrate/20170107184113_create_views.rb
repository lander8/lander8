class CreateViews < ActiveRecord::Migration[5.0]
  def change
    create_table :views do |t|
    	t.integer :website_id
    	t.integer :website_user_id
      t.timestamps
    end
  end
end
