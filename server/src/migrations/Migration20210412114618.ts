import { Migration } from '@mikro-orm/migrations';

export class Migration20210412114618 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `post` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `title` text not null);');
  }

}
