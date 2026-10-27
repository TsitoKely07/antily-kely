import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Territory } from '../../territory/entities/territory.entity';
import { Member } from '../../member/entities/member.entity';
import { MembershipFee } from '../../membership-fee/entities/membership-fee.entity';
import { MembershipPayment } from '../../membership-payment/entities/membership-payment.entity';

@Entity('membership')
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  roleDetail!: string | null;

  @Column({
    type: 'int',
    nullable: false,
  })
  status!: number;

  @Column({ name: 'territory_id', type: 'uuid', nullable: false, insert: false, update: false })
  territoryId!: string;

  @Column({ name: 'member_id', type: 'uuid', nullable: true, insert: false, update: false })
  memberId!: string | null;

  @Column({ name: 'membership_fee_id', type: 'uuid', nullable: true, insert: false, update: false })
  membershipFeeId!: string | null;

  @Column({ name: 'membership_payment_id', type: 'uuid', nullable: true, insert: false, update: false })
  membershipPaymentId!: string | null;

  @ManyToOne(() => Territory, (territory) => territory.memberships)
  @JoinColumn({ name: 'territory_id' })
  territory!: Territory;

  @ManyToOne(() => Member, (member) => member.memberships)
  @JoinColumn({ name: 'member_id' })
  member!: Member;

  @ManyToOne(() => MembershipFee, (membershipFee) => membershipFee.memberships)
  @JoinColumn({ name: 'membership_fee_id' })
  membershipFee!: MembershipFee;

  @ManyToOne(() => MembershipPayment, (membershipPayment) => membershipPayment.memberships)
  @JoinColumn({ name: 'membership_payment_id' })
  membershipPayment!: MembershipPayment;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
