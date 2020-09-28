import { Injectable, Module } from '@nestjs/common';
import { UniverseRepository, UniverseRepositoryToken } from '../domain/universe-domain';

/*
 * Repository being infrastructure, it depends on the domain (rule#1)
 * Actually, it is Injectable, and providing it is therefore pretty straightforward
 */
@Injectable()
export class UniverseRepositoryImpl implements UniverseRepository {
  public id;

  public constructor() {
    this.id = Math.ceil(Math.random() * 1000000);
    console.log('Repository is build with id', this.id, 'but after factory is resolved');
  }


  getAnswer() {
    console.log('I expect the id to be defined', this.id);
    return 14;
  }
}

@Module({
  providers: [
    {
      provide: UniverseRepositoryToken,
      useClass: UniverseRepositoryImpl
    }
  ],
  exports: [UniverseRepositoryToken]
})
export class UniverseRepositoryModule {}
