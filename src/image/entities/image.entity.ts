import { Bien } from 'src/bien/entities/bien.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
  @Column({ nullable: true })
  description: string; // Optional description of the image

  // Many-to-One relationship with Bien
  @ManyToOne(() => Bien, (bien) => bien.images, { onDelete: 'CASCADE' })
  bien: Bien;
}
