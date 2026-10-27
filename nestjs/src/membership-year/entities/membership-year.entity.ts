import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MembershipFee } from '../../membership-fee/entities/membership-fee.entity';

@Entity('membership_year')
export class MembershipYear {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  label!: string | null;

  @OneToMany(() => MembershipFee, (membershipFee) => membershipFee.membershipYear)
  membershipFees!: MembershipFee[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
