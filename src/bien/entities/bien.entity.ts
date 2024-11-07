import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BienStatut } from '../enums/bien-statut';
import { BienDisponible } from '../enums/bien-disponible';
import { Image } from 'src/image/entities/image.entity';

@Entity()
export class Bien {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adresse: string;

  @Column('decimal')
  prix: number;

  @Column({
    type: 'enum',
    enum: BienDisponible,
  })
  disponible: BienDisponible;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: BienStatut,
    default: BienStatut.VENDRE,
  })
  statut: BienStatut;

  @OneToMany(() => Image, (image) => image.bien, { cascade: true })
  images: Image[];
}
