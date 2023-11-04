import { customAlphabet } from 'nanoid';
const { v4: uuidv4 } = require('uuid');
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Product from './product.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  userId: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  phone: string;
  @BeforeInsert()
  generateId() {
    // const nanoid = customAlphabet('1234567890', 5);
    // this.userId = nanoid();
    this.userId = uuidv4().replace(/-/g, '').slice(0, 6);
  }
  @OneToMany((type) => Product, (product) => product.userId)
  product: Product[];
}
