import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Membership } from '../../membership/entities/membership.entity';

@Entity('membership_payment')
export class MembershipPayment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  date!: Date | null;

  @Column({
    type: 'decimal',
    precision: 255,
    scale: 2,
    nullable: true,
  })
  amount!: number | null;

  @Column({
    type: 'int',
    nullable: true,
  })
  status!: number | null;

  @OneToMany(() => Membership, (membership) => membership.membershipPayment)
  memberships!: Membership[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
