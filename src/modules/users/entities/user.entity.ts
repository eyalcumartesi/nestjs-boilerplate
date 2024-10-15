import { Exclude } from 'class-transformer';
import Role from 'src/common/enums/Role';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: Role;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude({ toPlainOnly: true })
  deletedAt: Date;
}
