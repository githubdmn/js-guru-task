import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import Product from './product.entity';
import Base from './base.entity';

@Entity()
export default class User extends Base {
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
    this.userId = super.idGenerator();
  }
  @OneToMany((type) => Product, (product) => product.userId)
  product: Product[];
}
