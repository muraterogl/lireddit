import { Migration } from '@mikro-orm/migrations';

export class Migration20210413191346 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `username` text not null, `title` text not null);');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');
  }

}
