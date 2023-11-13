import { BeforeInsert, Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import User from './user.entity';
import Base from './base.entity';

@Entity()
export default class Product extends Base {
  @Column({ unique: true })
  productId: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @BeforeInsert()
  generateId() {
    this.productId = super.idGenerator();
  }
  @ManyToOne((type) => User, (user) => user.userId, {
    cascade: true,
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  userId: string;
}
