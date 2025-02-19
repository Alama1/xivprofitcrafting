import { DataSource, EntityManager, Repository } from 'typeorm';
import { Recipe } from '../recipe.entity';

export class AppointmentRepository {
  private readonly repository: Repository<Recipe>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Recipe);
  }

  async createAndSaveRecipe(
    appointmentData: Partial<Recipe>,
    manager: EntityManager
  ): Promise<Recipe> {
    const recipe = this.repository.create(appointmentData);
    return manager.save(Recipe, recipe);
  }
}
