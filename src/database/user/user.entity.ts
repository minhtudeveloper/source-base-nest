import { BaseEntity } from '@/bases/entities/base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users', orderBy: { updatedAt: 'DESC' } })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  lastLoginAt: Date;
}
