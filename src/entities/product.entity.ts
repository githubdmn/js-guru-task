import { customAlphabet } from 'nanoid';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;
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
    const nanoid = customAlphabet('1234567890', 5);
    this.productId = nanoid();
  }
  @ManyToOne((type) => User, (user) => user.userId, {
    cascade: true,
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  userId: string;
}
