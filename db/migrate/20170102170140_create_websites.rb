class CreateWebsites < ActiveRecord::Migration[5.0]
  def change
    create_table :websites do |t|
    	t.string :name
    	t.integer :user_id
    	t.string :url
    	t.string :api_key
      t.timestamps
    end
  end
end
