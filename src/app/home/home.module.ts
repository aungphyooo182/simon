import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalComponentsModule } from '../global-components/global-components.module';
import { SharedComponentsModule } from './presentation/shared-components/shared-components.module';
import { BusinessLogicFacade } from './business-logic/business-logic.facade';
import { BusinessRequirementsInjectionToken } from './presentation/business-logic.requirements';
import { HomePageModule } from './presentation/home-page/home-page.module';
import { GameStateService } from '../lib/game-state.service';
import { ShareService } from '../lib/share.service';
import { UserService } from './data/api-services/user.service';
@NgModule({
  imports: [
    BusinessLogicFacade,
    CommonModule,
    GlobalComponentsModule,
    SharedComponentsModule,
    HomePageModule,
  ],
  providers: [
    {
      provide: BusinessRequirementsInjectionToken,
      useClass: BusinessLogicFacade,
    },
    GameStateService,
    UserService,
    ShareService,
  ],
  exports: [],
})
export class HomeFeatureModule {}
