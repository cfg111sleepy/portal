import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BookListComponent } from './temp/redux/book-list/book-list.component';
import { booksReducer } from './state/book.reducer';
import { collectionReducer } from './state/collection.reducer';
import { BookCollectionComponent } from './temp/redux/book-collection/book-collection.component';
import { BookEffects } from './effects/book.effects';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { Component1Component } from './temp/componets/component1/component1.component';
import { Component2Component } from './temp/componets/component2/component2.component';
import { Component3Component } from './temp/componets/component3/component3.component';
import { SidebarComponent } from './temp/componets/sidebar/sidebar.component';
import { SideMenuTreeComponent } from './features/side-menu-tree/side-menu-tree.component';
import { SideMenuTreeNodeComponent } from './features/side-menu-tree/side-menu-tree-node/side-menu-tree-node.component';
import { LoginComponent } from './features/login/login.component';
import { userReducer } from './state/auth.reducer';
import { UserEffects } from './effects/user.effects';
import { NavigateEffects } from './effects/navigate.effects';
import { HomeComponent } from './features/home/home.component';
import { ErrorComponent } from './features/error/error.component';
import { FormsModule } from '@angular/forms';
import { loaderReducer } from './state/loader.reducer';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { SvgWinjet1Component } from './features/widjets/svg-winjet1/svg-winjet1.component';
import { Component4Component } from './temp/componets/component4/component4.component';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { LinearChartComponent } from './features/charting/linear-chart/linear-chart.component';
import { BarCart1Component } from './features/charting/bar-cart1/bar-cart1.component';
import { BarChartComponent } from './features/charting/bar-chart/bar-chart.component';
import { ProgressBarComponent } from './features/widjets/progress-bar/progress-bar.component';
import { calendarReducer } from './state/calendar.reducer';
import { GasStorageMapComponent } from './features/dashboards/gas-storage-map/gas-storage-map.component';
import { opdataReducer } from './state/opdata.reducers';
import { OpdataEffects } from './effects/opdata.effects';
import { PsgSvgWidjetComponent } from './features/widjets/psg-svg-widjet/psg-svg-widjet.component';
import { SmallTableComponent } from './features/widjets/small-table/small-table.component';
import { TableCellComponent } from './features/widjets/small-table/table-cell/table-cell.component';
import { TableSubCellComponent } from './features/widjets/small-table/table-sub-cell/table-sub-cell.component';
import { TemperatureMapComponent } from './features/dashboards/temperature-map/temperature-map.component';
import { wheaterForecastReducer } from './state/temperatures.reducer';
import { WheaterEffects } from './effects/weather.effects';
import { WeatherCityComponent } from './features/widjets/weather-city/weather-city.component';
import { ForecastCityLineComponent } from './features/charting/forecast-city-line/forecast-city-line.component';
import { TemperaturesChartsComponent } from './features/dashboards/temperatures-charts/temperatures-charts.component';
import { PopupRangeSelectorComponent } from './features/range/popup-range-selector/popup-range-selector.component';
import { rangeReducer } from './state/range.reducers';
import { ActGasChartsComponent } from './features/dashboards/act-gas-charts/act-gas-charts.component';
import { OpDataLineChartComponent } from './features/charting/op-data-line-chart/op-data-line-chart.component';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { UserEditComponent } from './features/admin/user-edit/user-edit.component';
import { user1Reducer } from './state/user.reducer';
import { UserCreateComponent } from './features/admin/user-create/user-create.component';
import { SeasonStatTableComponent } from './features/statistics/season-stat-table/season-stat-table.component';
import { SeasonStatTableComponentRow } from './features/statistics/season-stat-table-row/season-stat-table-row.component';
import { SeasonPeriodsTableRowComponent } from './features/statistics/season-periods-table-row/season-periods-table-row.component';
import { seasonReducer } from './state/season.reducers';
import { SeasonEffects } from './effects/season.effects';
import { TovRegimChartsComponent } from './features/dashboards/tov-regim-charts/tov-regim-charts.component';
import { OpData2LineChartComponent } from './features/charting/op-data2-line-chart/op-data2-line-chart.component';
import { OpData1LineChartComponent } from './features/charting/op-data1-line-chart/op-data1-line-chart.component';
import { TableCellLastComponent } from './features/widjets/small-table/table-cell-last/table-cell-last.component';
import { TovRegimMapComponent } from './features/dashboards/tov-regim-map/tov-regim-map.component';
import { KcComponent } from './features/widjets/kc/kc.component';
import { TableCell3OffsetComponent } from './features/dashboards/tov-regim-map/table-cell3-offset/table-cell3-offset.component';
import { FbgPic1Component } from './features/dashboards/fbg-pic1/fbg-pic1.component';
import { NsiEffects } from './effects/nsi.effects';
import { nsiReducer } from './state/nsi.reducers';
import { PsgSvgWidjetFakeComponent } from './features/widjets/psg-svg-widjet-fake/psg-svg-widjet-fake.component';
import { SeasonStatTableHeaderComponent } from './features/statistics/season-stat-table-header/season-stat-table-header.component';
import { CommerseComponent } from './features/dashboards/commerse/commerse.component';
import { TableAddCellComponent } from './features/widjets/small-table/table-cell/table-add-cell/table-add-cell.component';
import { OpDataPie1ChartComponent } from './features/charting/op-data-pie1-chart/op-data-pie1-chart.component';
import { AgsiGieEuComponent } from './features/dashboards/agsi-gie-eu/agsi-gie-eu.component';
import { agsiReducer } from './state/agsi.reducer';
import { AgsiEffects } from './effects/agsi.effects';
import { PsgSvgWidjetEuComponent } from './features/widjets/psg-svg-widjet-eu/psg-svg-widjet-eu.component';
import { AgsiCountryDayTableRowComponent } from './features/dashboards/agsi-gie-eu/agsi-country-day-table-row/agsi-country-day-table-row.component';
import { DaysCompareXLinesChartComponent } from './features/charting/days-compare-x-lines-chart/days-compare-x-lines-chart.component';
import { ErrorEffects } from './effects/error.effects';
import { GasStorageMapGreyComponent } from './features/dashboards/gas-storage-map-grey/gas-storage-map-grey.component';
import { OpDataLine1ChartDaysXComponent } from './features/charting/op-data-line1-chart-days-x/op-data-line1-chart-days-x.component';
import { ScadaComponent } from './features/dashboards/scada/scada.component';
import { KcCellComponent } from './features/widjets/kc-cell/kc-cell.component';
import { WithInjectIndicatorComponent } from './features/widjets/small-table/with-inject-indicator/with-inject-indicator.component';
import { VtvPsgDaysTableRowComponent } from './features/dashboards/fbg-pic1/vtv-psg-days-table-row/vtv-psg-days-table-row.component';
import { PsgSvgWidjet10HourComponent } from './features/widjets/psg-svg-widjet10-hour/psg-svg-widjet10-hour.component';
import { DayAddXLinesChartComponentComponent } from './features/charting/day-add-xlines-chart-component/day-add-xlines-chart-component.component';
import { Component5Component } from './temp/componets/component5/component5.component';
import { statisticsReducer } from './state/stat.reducers';
import { StatDataEffects } from './effects/statdata.effects';
import { SeasonInjectEffects } from './effects/season-inject.effects';
import { seasonInjectReducer } from './state/season-inj.reducers';
import { SeasonInjectStatTableComponent } from './features/statistics/season-inject-stat-table/season-inject-stat-table.component';
import { OpData3LineChartComponent } from './features/charting/op-data3-line-chart/op-data3-line-chart.component';
import { themesReducer } from './state/theme.reducer';
import { OpData2PieChartComponent } from './features/charting/op-data2-pie-chart/op-data2-pie-chart.component';
import { OpDataBar3ChartComponent } from './features/charting/op-data-bar3-chart/op-data-bar3-chart.component';
import { actGasSeasonReducer } from './state/act-gas-season.reducers';
import { ActGasSeasonEffects } from './effects/actgas-seasons';
import { ActGasSeasonsComponent } from './features/dashboards/act-gas-seasons/act-gas-seasons.component';
import { TovRegimMap1Component } from './features/dashboards/tov-regim-map1/tov-regim-map1.component';
import { KcCellColoredComponent } from './features/widjets/kc-cell-colored/kc-cell-colored.component';
import { ParameterTrendComponent } from './features/popup/parameter-trend/parameter-trend.component';
import { ResourceGpaComponent } from './features/dashboards/resource-gpa/resource-gpa.component';
import { GpaToCpKpComponent } from './features/dashboards/resource-gpa/gpa-to-cp-kp/gpa-to-cp-kp.component';
import { PsgParkGpaComponent } from './features/dashboards/resource-gpa/psg-park-gpa/psg-park-gpa.component';
import { StoresGpaEffects } from './effects/aggrgsastore.effects';
import { storesGpaReducer } from './state/stores-gpa.reducers';
import { NsiComponent } from './features/dashboards/nsi/nsi.component';
import { AgsiCountryComponent } from './features/dashboards/agsi-gie-eu/agsi-country/agsi-country.component';
import { KcCellColored1Component } from './features/widjets/kc-cell-colored1/kc-cell-colored1.component';
import { TableCellLast1Component } from './features/widjets/small-table/table-cell-last1/table-cell-last1.component';
import { FlowForecastComponent } from './temp/componets/component5/flow-forecast/flow-forecast.component';
import { httpcommsReducer } from './state/http-comms.reducer';
import { HttpCommsEffects } from './effects/http-comms.effects';
import { GasConsumeTemperatureComponent } from './temp/componets/component5/gas-consume-temperature/gas-consume-temperature.component';
import { RegionsConsumeTableComponent } from './temp/componets/component5/regions-consume-table/regions-consume-table.component';
import { VtvPsgDaysTableRowCompactComponent } from './features/dashboards/fbg-pic1/vtv-psg-days-table-row-compact/vtv-psg-days-table-row-compact.component';
import { InjectWithdrTextComponent } from './features/widjets/inject-withdr-text/inject-withdr-text.component';
import { TableCellLast2Component } from './features/widjets/small-table/table-cell-last2/table-cell-last2.component';
import { AgsiEuTrendComponent } from './features/popup/agsi-eu-trend/agsi-eu-trend.component';
import { ZamovnykTableComponent } from './features/dashboards/commerse/zamovnyk-table/zamovnyk-table.component';
import { OpData3PieChartComponent } from './features/charting/op-data3-pie-chart/op-data3-pie-chart.component';
import { PsgBaseSeaconComponent } from './features/widjets/psg-base-seacon/psg-base-seacon.component';
import { PsgSeasonsComponent } from './features/dashboards/psg-seasons/psg-seasons.component';
import { FlowForecastHhComponent } from './temp/componets/component5/flow-forecast-hh/flow-forecast-hh.component';
import { FlowForecastDdComponent } from './temp/componets/component5/flow-forecast-dd/flow-forecast-dd.component';






@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookCollectionComponent,
    Component1Component,
    Component2Component,
    Component3Component,
    SidebarComponent,
    SideMenuTreeComponent,
    SideMenuTreeNodeComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    SvgWinjet1Component,
    Component4Component,
    LinearChartComponent,
    BarCart1Component,
    BarChartComponent,
    ProgressBarComponent,
    GasStorageMapComponent,
    PsgSvgWidjetComponent,
    SmallTableComponent,
    TableCellComponent,
    TableSubCellComponent,
    TemperatureMapComponent,
    WeatherCityComponent,
    ForecastCityLineComponent,
    TemperaturesChartsComponent,
    PopupRangeSelectorComponent,
    ActGasChartsComponent,
    OpDataLineChartComponent,
    UserListComponent,
    UserEditComponent,
    UserCreateComponent,
    SeasonStatTableComponent,
    SeasonStatTableComponentRow,
    SeasonPeriodsTableRowComponent,
    TovRegimChartsComponent,
    OpData2LineChartComponent,
    OpData1LineChartComponent,
    TableCellLastComponent,
    TovRegimMapComponent,
    KcComponent,
    TableCell3OffsetComponent,
    FbgPic1Component,
    PsgSvgWidjetFakeComponent,
    SeasonStatTableHeaderComponent,
    CommerseComponent,
    TableAddCellComponent,
    OpDataPie1ChartComponent,
    AgsiGieEuComponent,
    PsgSvgWidjetEuComponent,
    AgsiCountryDayTableRowComponent,
    DaysCompareXLinesChartComponent,
    GasStorageMapGreyComponent,
    OpDataLine1ChartDaysXComponent,
    ScadaComponent,
    KcCellComponent,
    WithInjectIndicatorComponent,
    VtvPsgDaysTableRowComponent,
    PsgSvgWidjet10HourComponent,
    DayAddXLinesChartComponentComponent,
    Component5Component,
    SeasonInjectStatTableComponent,
    OpData3LineChartComponent,
    OpData2PieChartComponent,
    OpDataBar3ChartComponent,
    ActGasSeasonsComponent,
    TovRegimMap1Component,
    KcCellColoredComponent,
    ParameterTrendComponent,
    ResourceGpaComponent,
    GpaToCpKpComponent,
    PsgParkGpaComponent,
    NsiComponent,
    AgsiCountryComponent,
    KcCellColored1Component,
    TableCellLast1Component,
    FlowForecastComponent,
    GasConsumeTemperatureComponent,
    RegionsConsumeTableComponent,
    VtvPsgDaysTableRowCompactComponent,
    InjectWithdrTextComponent,
    TableCellLast2Component,
    AgsiEuTrendComponent,
    ZamovnykTableComponent,
    OpData3PieChartComponent,
    PsgBaseSeaconComponent,
    PsgSeasonsComponent,
    FlowForecastHhComponent,
    FlowForecastDdComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgChartsModule,

    
    StoreModule.forRoot({ 
      books: booksReducer, 
      collection: collectionReducer, 
      router: routerReducer, 
      user: userReducer,
      loading: loaderReducer,
      currentDate: calendarReducer,
      opdata: opdataReducer,
      wheater: wheaterForecastReducer,
      range: rangeReducer,
      user1: user1Reducer,
      season: seasonReducer,
      nsi: nsiReducer,
      agsi: agsiReducer,
      statistics: statisticsReducer,
      seasonInject: seasonInjectReducer,
      thema : themesReducer,
      actgasSeason: actGasSeasonReducer,
      allgpagasstore: storesGpaReducer,
      httpcomms: httpcommsReducer,


    }, {}),

    EffectsModule.forRoot([
      BookEffects,
      UserEffects,
      NavigateEffects,
      OpdataEffects,
      WheaterEffects,
      SeasonEffects,
      NsiEffects,
      AgsiEffects,
      ErrorEffects,
      StatDataEffects,
      SeasonInjectEffects,
      ActGasSeasonEffects,
      StoresGpaEffects,
      HttpCommsEffects,

      
    ]),
    
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    FormsModule
  ],
  providers: [  
    { provide: NgChartsConfiguration, useValue: { generateColors: true }},   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
