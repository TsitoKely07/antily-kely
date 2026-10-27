import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Territory } from '../../territory/entities/territory.entity';
import { Membership } from '../../membership/entities/membership.entity';
import { TerritoryLevel } from '../../territory-level/entities/territory-level.entity';

@Entity('territory')
export class Territory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name!: string | null;

  @Column({
    type: 'int',
    nullable: true,
  })
  number!: number | null;

  @Column({ name: 'territory_dependance_id', type: 'uuid', nullable: true, insert: false, update: false })
  territoryDependanceId!: string | null;

  @Column({ name: 'territory_level_id', type: 'uuid', nullable: true, insert: false, update: false })
  territoryLevelId!: string | null;

  @ManyToOne(() => Territory, (territory) => territory.territories)
  @JoinColumn({ name: 'territory_dependance_id' })
  territory!: Territory;

  @OneToMany(() => Membership, (membership) => membership.territory)
  memberships!: Membership[];

  @ManyToOne(() => TerritoryLevel, (territoryLevel) => territoryLevel.territories)
  @JoinColumn({ name: 'territory_level_id' })
  territoryLevel!: TerritoryLevel;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
