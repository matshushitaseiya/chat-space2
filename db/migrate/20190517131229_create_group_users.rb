class CreateGroupUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :group_users do |t|
      t.references :group, foreigh_key: true
      t.references :user, foreigh_key: true
      t.timestamps
    end
  end
end
