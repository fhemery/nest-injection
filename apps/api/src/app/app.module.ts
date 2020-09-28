import { Module } from '@nestjs/common';
import { UniverseRepositoryModule } from './repository/universe-repository';
import { UniverseDomainModule } from './domain/universe-domain';
import { UniverseApiModule } from './api/universe-api.module';

/* ****** IT ALL STARTS HERE ************
 * This App contains three distinct parts, from right to left :
 *  * the ApiModule contains the controller
 *  * the DomainModule contains the business logic. It has one rule: except the module, 0 Nest presence is allowed, in order to follow hexagonal architecture pattern
 *  * the Repository module is a piece of infrastructure that would in normal conditions represent a database.
 *
 * NOTE : none of the module depend directly on one another. This may be a controversial decision, but the idea is that
 *  only the App knows which parts to use. It can therefore later on swap on the fly if need be.
 *
 * In Angular, this would be not much of an issue : each provider being injected at the root, if I load the modules in
 * the right order, it should load just fine.
 * Nest is slightly different.
 *
 * Let's check the domain in details, because it carries most of the trouble
 */

@Module({
  imports: [UniverseRepositoryModule, UniverseDomainModule, UniverseApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
