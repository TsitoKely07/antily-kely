import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TerritoryLevel } from '../../territory-level/entities/territory-level.entity';
import { Branch } from '../../branch/entities/branch.entity';
import { MembershipFee } from '../../membership-fee/entities/membership-fee.entity';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  isYouth!: boolean | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  label!: string | null;

  @Column({ name: 'territory_level_id', type: 'uuid', nullable: true, insert: false, update: false })
  territoryLevelId!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true, insert: false, update: false })
  branchId!: string | null;

  @ManyToOne(() => TerritoryLevel, (territoryLevel) => territoryLevel.roles)
  @JoinColumn({ name: 'territory_level_id' })
  territoryLevel!: TerritoryLevel;

  @ManyToOne(() => Branch, (branch) => branch.roles)
  @JoinColumn({ name: 'branch_id' })
  branch!: Branch;

  @OneToMany(() => MembershipFee, (membershipFee) => membershipFee.role)
  membershipFees!: MembershipFee[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
