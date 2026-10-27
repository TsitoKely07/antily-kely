import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MembershipYear } from '../../membership-year/entities/membership-year.entity';
import { TerritoryLevel } from '../../territory-level/entities/territory-level.entity';
import { Role } from '../../role/entities/role.entity';
import { Membership } from '../../membership/entities/membership.entity';

@Entity('membership_fee')
export class MembershipFee {
  @Column({
    type: 'decimal',
    precision: 255,
    scale: 2,
    nullable: true,
  })
  fee!: number | null;

  @Column({ name: 'id', type: 'uuid', nullable: false, insert: false, update: false })
  id!: string;

  @Column({ name: 'membership_year_id', type: 'uuid', nullable: true, insert: false, update: false })
  membershipYearId!: string | null;

  @Column({ name: 'role_id', type: 'uuid', nullable: true, insert: false, update: false })
  roleId!: string | null;

  @ManyToOne(() => MembershipYear, (membershipYear) => membershipYear.membershipFees)
  @JoinColumn({ name: 'membership_year_id' })
  membershipYear!: MembershipYear;

  @ManyToOne(() => TerritoryLevel, (territoryLevel) => territoryLevel.membershipFees)
  @JoinColumn({ name: 'id' })
  territoryLevel!: TerritoryLevel;

  @ManyToOne(() => Role, (role) => role.membershipFees)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @OneToMany(() => Membership, (membership) => membership.membershipFee)
  memberships!: Membership[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
