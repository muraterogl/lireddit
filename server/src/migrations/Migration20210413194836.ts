import { Migration } from '@mikro-orm/migrations';

export class Migration20210413194836 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` rename column `title` to `password`;');
  }

}
