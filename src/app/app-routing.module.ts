import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './features/admin/user-create/user-create.component';
import { UserEditComponent } from './features/admin/user-edit/user-edit.component';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { BarCart1Component } from './features/charting/bar-cart1/bar-cart1.component';
import { BarChartComponent } from './features/charting/bar-chart/bar-chart.component';
import { ActGasChartsComponent } from './features/dashboards/act-gas-charts/act-gas-charts.component';
import { AgsiGieEuComponent } from './features/dashboards/agsi-gie-eu/agsi-gie-eu.component';
import { CommerseComponent } from './features/dashboards/commerse/commerse.component';
import { FbgPic1Component } from './features/dashboards/fbg-pic1/fbg-pic1.component';
import { GasStorageMapComponent } from './features/dashboards/gas-storage-map/gas-storage-map.component';
import { TemperatureMapComponent } from './features/dashboards/temperature-map/temperature-map.component';
import { TemperaturesChartsComponent } from './features/dashboards/temperatures-charts/temperatures-charts.component';
import { TovRegimChartsComponent } from './features/dashboards/tov-regim-charts/tov-regim-charts.component';
import { TovRegimMapComponent } from './features/dashboards/tov-regim-map/tov-regim-map.component';
import { ErrorComponent } from './features/error/error.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { SeasonStatTableComponent } from './features/statistics/season-stat-table/season-stat-table.component';
import { AuthGuard } from './guards/auth.guard';
import { Component1Component } from './temp/componets/component1/component1.component';
import { Component2Component } from './temp/componets/component2/component2.component';
import { Component3Component } from './temp/componets/component3/component3.component';
import { Component4Component } from './temp/componets/component4/component4.component';
import { GasStorageMapGreyComponent } from './features/dashboards/gas-storage-map-grey/gas-storage-map-grey.component';
import { ScadaComponent } from './features/dashboards/scada/scada.component';
import { Component5Component } from './temp/componets/component5/component5.component';
import { SeasonInjectStatTableComponent } from './features/statistics/season-inject-stat-table/season-inject-stat-table.component';
import { ActGasSeasonsComponent } from './features/dashboards/act-gas-seasons/act-gas-seasons.component';
import { TovRegimMap1Component } from './features/dashboards/tov-regim-map1/tov-regim-map1.component';
import { ParameterTrendComponent } from './features/popup/parameter-trend/parameter-trend.component';
import { ResourceGpaComponent } from './features/dashboards/resource-gpa/resource-gpa.component';
import { NsiComponent } from './features/dashboards/nsi/nsi.component';
import { ZamovnykTableComponent } from './features/dashboards/commerse/zamovnyk-table/zamovnyk-table.component';
import { PsgSeasonsComponent } from './features/dashboards/psg-seasons/psg-seasons.component';
import { FlowForecastDdComponent } from './temp/componets/component5/flow-forecast-dd/flow-forecast-dd.component';
import { FlowForecastHhComponent } from './temp/componets/component5/flow-forecast-hh/flow-forecast-hh.component';


const routes: Routes = [
  { path: 'dashboards/flow-forecast-hh', component: FlowForecastHhComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/flow-forecast-dd', component: FlowForecastDdComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/seasons', component: PsgSeasonsComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/commerse/customer', component: ZamovnykTableComponent, canActivate: [AuthGuard], },  
  { path: 'dashboards/nsi', component: NsiComponent, canActivate: [AuthGuard], },  
  { path: 'dashboards/resource-gpa', component: ResourceGpaComponent, canActivate: [AuthGuard], },  
  { path: 'popups/trend', component: ParameterTrendComponent, canActivate: [AuthGuard], },  
  { path: 'dashboards/tovregmap1', component: TovRegimMap1Component, canActivate: [AuthGuard], },  
  { path: 'dashboards/actgas-seasons', component: ActGasSeasonsComponent, canActivate: [AuthGuard], },  
  { path: 'dashboards/season-inject', component: SeasonInjectStatTableComponent, canActivate: [AuthGuard], },  
  { path: 'dashboards/scada', component: ScadaComponent, canActivate: [AuthGuard], },  
  { path: 'dashboards/storagemap/grey', component: GasStorageMapGreyComponent, canActivate: [AuthGuard], },  
  { path: 'dashboards/agsi', component: AgsiGieEuComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/commerse', component: CommerseComponent, canActivate: [AuthGuard], },   
  { path: 'dashboards/fbgpic1', component: FbgPic1Component, canActivate: [AuthGuard], }, 
  { path: 'dashboards/tovregmap', component: TovRegimMapComponent, canActivate: [AuthGuard], }, 
  { path: 'dashboards/tovregim', component: TovRegimChartsComponent, canActivate: [AuthGuard], }, 
  { path: 'dashboards/seasonstats', component: SeasonStatTableComponent, canActivate: [AuthGuard], }, 
  { path: 'dashboards/actgascharts', component: ActGasChartsComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/wheathercharts', component: TemperaturesChartsComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/wheathermap', component: TemperatureMapComponent, canActivate: [AuthGuard], },
  { path: 'dashboards/storagemap', component: GasStorageMapComponent, canActivate: [AuthGuard], },
  { path: 'component1', component: Component1Component, canActivate: [AuthGuard], },
  { path: 'component2', component: Component2Component, canActivate: [AuthGuard], },
  { path: 'component3', component: Component3Component, canActivate: [AuthGuard], },
  { path: 'component4', component: Component4Component, canActivate: [AuthGuard], },
  { path: 'component5', component: BarCart1Component, canActivate: [AuthGuard], },
  { path: 'component6', component: Component5Component, canActivate: [AuthGuard], },

  { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard], },
  { path: 'users/list', component: UserListComponent, canActivate: [AuthGuard], },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard], }, 

  { path: 'bar', component: BarChartComponent },

  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
