import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Territory } from '../../territory/entities/territory.entity';
import { MembershipFee } from '../../membership-fee/entities/membership-fee.entity';
import { Role } from '../../role/entities/role.entity';

@Entity('territory_level')
export class TerritoryLevel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  level!: number | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name!: string | null;

  @OneToMany(() => Territory, (territory) => territory.territoryLevel)
  territories!: Territory[];

  @OneToMany(() => MembershipFee, (membershipFee) => membershipFee.territoryLevel)
  membershipFees!: MembershipFee[];

  @OneToMany(() => Role, (role) => role.territoryLevel)
  roles!: Role[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
