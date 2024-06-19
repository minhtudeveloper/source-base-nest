import {
  BaseEntity as BaseEntityTypeorm,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity extends BaseEntityTypeorm {
  constructor() {
    super();
  }

  @CreateDateColumn({
    nullable: false,
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
    type: 'timestamptz',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    default: null,
    nullable: true,
    type: 'timestamptz',
  })
  deletedAt?: Date;
}
