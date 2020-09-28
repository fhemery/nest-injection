import { Controller, Get, Module, OnModuleInit } from '@nestjs/common';
import { UniverseQuery, UniverseQueryToken } from '../domain/universe-domain';
import { ModuleRef } from '@nestjs/core';

@Controller('/universe')
export class UniverseController implements OnModuleInit {

  private universeQuery: UniverseQuery

  // Because the modules does not depend on one another, to be swappable, I need to use the moduleRef to get my query
  public constructor(private moduleRef: ModuleRef) {
  }

  onModuleInit(): void {
    this.universeQuery = this.moduleRef.get(UniverseQueryToken, {strict: false});
  }

  @Get('')
  public getAnswer() {
    return this.universeQuery.getAnswer();
  }
}


@Module({
  controllers: [UniverseController]
})
export class UniverseApiModule {}
