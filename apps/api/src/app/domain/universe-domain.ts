import { Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

/*
 * The Domain exposes the UniverseQuery (CQRS principle). This query is part of the business domain.
 *
 * Following the hexagonal architecture pattern, two rules apply :
 *   * Rule#1: The domain cannot depend on any other project. It therefore exposes its necessary interfaces outside (thus, the UniverseRepository defined here)
 *   * Rule#2: The domain cannot depend on any framework, including Nest. Only the module is an exception.
 */
export interface UniverseQuery {
  getAnswer(): number;
}

export const UniverseQueryToken = 'UniverseQueryToken';

const THE_MAGIC_NUMBER = 3;
export class UniverseCommandImpl implements UniverseQuery {

  // In accordance which Rule#1: the query is not injectable.
  public constructor(private universeRepo: UniverseRepository) {
  }

  getAnswer(): number {
    return this.universeRepo.getAnswer() * THE_MAGIC_NUMBER;
  }

}

export interface UniverseRepository {
  getAnswer(): number;
}

export const UniverseRepositoryToken = 'UniverseRepositoryToken';


@Module({
  providers: [{
    provide: UniverseQueryToken,
    // The only way I can get the repo from the API is therefore by providing the fully build object (dependencies included)
    // as the external Token.
    useFactory: (moduleRef) => {
      const repo = moduleRef.get(UniverseRepositoryToken, { strict: false });
      console.log('The bug lies here. The repo is not yet built, as it has id', repo.id, 'However, the method getAnswer is defined ô_O, ', repo.getAnswer );
      return new UniverseCommandImpl(repo);
    },
    inject: [ModuleRef]
  }],
  exports: [UniverseQueryToken]
})
export class UniverseDomainModule {

}
