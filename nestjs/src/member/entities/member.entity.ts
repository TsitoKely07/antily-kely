import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Membership } from '../../membership/entities/membership.entity';

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name!: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  firstname!: string | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth!: Date | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  email!: string | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  phone!: string | null;

  @OneToMany(() => Membership, (membership) => membership.member)
  memberships!: Membership[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
