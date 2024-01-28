// Angular imports
import {Component, OnInit} from "@angular/core";

// My imports
import {BaseComponent} from "src/app/_base/components/_base/base.component";
import {
  DataSetsNgModelRecordFormat,
  DataSetsNgModelType,
  DataSetsStoreRecordFormat,
  DataSetsStoreType
} from 'src/app/_base/components/_base/data-sets/data-sets.interfaces';
import {Setting} from 'src/app/_base/decorators/setting/setting.decorator';
import {BaseUtil} from './../../../_base/utils/base.util';
import {SettingsNames} from './../../../_base/utils/enviroment.util';
import {EventsUtil} from './../../../_base/utils/events.util';
import {DataSetsSettingDecoratorConverter} from './data-sets.setting.decorator.converter';
import {CryptogrService} from "../../../_base/services/cryptogr.service";
import {CryptogrServiceImpl} from "../../../_base/services/cryptogr.service.impl";
import {resolve} from "@angular/compiler-cli";


@Component({
    selector: 'component-data-sets',
    templateUrl: './data-sets.component.html',
    styleUrls: [
        './../../options.component.scss'
    ]
})
export class DataSetsComponent extends BaseComponent implements OnInit {

  private static readonly FIRE_TRESHOLD_MILISECONDS : number = 1000;

  private static readonly CONVERTER = new DataSetsSettingDecoratorConverter();

  //TODO temp fix pri odstranovani default values z prezentacnej vrstvy
  private static DEFAULT_ENV : DataSetsStoreType = [{
    id: 0,
    name: "Základné prostredie",
    datasets: [
      "http://example.com/data"
    ],
    useLogin: false,
    usernameHash: null,
    passHash: null,
    useLoginDefault: false
  }];


  @Setting({
    storeKey: SettingsNames.SECURE_KEY,
    onlyDownload: true,
    executeAfterAll: (result : string) => {
      console.log("----------- after exec secure key");
      //FIXME ugly hack that sets secure key into converter for encrypting and decrypting sensitive informations
      // it looks like that it will always run before enviroments parameters are first time queried
      DataSetsComponent.CONVERTER.setSecureKey(result);
    }
  })
  public secureKey !: string;

  @Setting({
    storeKey: SettingsNames.ENVIROMENTS,
    converter: DataSetsComponent.CONVERTER,
    // executeAfterAll: (result: any) => {
    //   console.log("---------------- after exec");
    //   console.log(result);
    // },
    executeBeforeAll: async (...enviroments: DataSetsStoreRecordFormat[]) => {
      const promises: Promise<any>[] = [];

      for (const enviroment of enviroments) {
        if (enviroment.passHash) {
          promises.push(
            CryptogrServiceImpl
              .decryptStatic(enviroment.passHash, DataSetsComponent.CONVERTER.getSecureKey())
              .then(unhashedPass => enviroment.passHash = unhashedPass.data));
        }
        if (enviroment.usernameHash) {
          promises.push(
            CryptogrServiceImpl
              .decryptStatic(enviroment.usernameHash, DataSetsComponent.CONVERTER.getSecureKey())
              .then(unhashedName => enviroment.usernameHash = unhashedName.data));
        }
      }

      const resolve = await Promise
        .allSettled(promises);
      console.log("------- all settlerd");
      console.log(enviroments);
      console.log(resolve);
      return enviroments;
    },

    // zostrelí chrome
    // executeOnGet: (...environments : DataSetsNgModelRecordFormat[]) => {
    //   console.log("---- executed on get");
    //   console.log(environments);
    //
    //   for (const enviroment of environments) {
    //     if (enviroment.pass) {
    //         CryptogrServiceImpl
    //           .decryptStatic(enviroment.pass, DataSetsComponent.CONVERTER.getSecureKey())
    //           .then(unhashedPass => enviroment.pass = unhashedPass.data);
    //     }
    //     if (enviroment.username) {
    //         CryptogrServiceImpl
    //           .decryptStatic(enviroment.username, DataSetsComponent.CONVERTER.getSecureKey())
    //           .then(unhashedName => enviroment.username = unhashedName.data);
    //     }
    //   }
    // },

    executeBeforeStoreAfterConversion: async (enviroment: DataSetsStoreRecordFormat) => {
      const promises: Promise<any>[] = [];
      if (enviroment.passHash) {
        promises.push(CryptogrServiceImpl
          .encryptStatic(enviroment.passHash, DataSetsComponent.CONVERTER.getSecureKey())
          .then(hashedPass => enviroment.passHash = hashedPass.data));
      }
      if (enviroment.usernameHash) {
        promises.push(CryptogrServiceImpl
          .encryptStatic(enviroment.usernameHash, DataSetsComponent.CONVERTER.getSecureKey())
          .then(hashedUser => enviroment.usernameHash = hashedUser.data));
      }

      const resolve = await Promise
        .allSettled(promises);
      console.log("---------------- beforeStore after conversion vo vnutri promise");
      console.log(enviroment);
      return resolve;
      console.log("---------------- beforeStore after conversion");
      console.log(enviroment);
    },

    // executeBeforeStoreAfterConversion: (value: DataSetsStoreRecordFormat) => {
    //   console.log("---------------- beforeStore after conversion");
    //   console.log(value);
    // }
  })
  public enviroments !: DataSetsNgModelType;

  @Setting({
    storeKey: SettingsNames.ENVIROMENTS,
    converter: DataSetsComponent.CONVERTER,
    onlyDownload: true // will not work either for objects
  })
  private enviromentsBefore !: DataSetsNgModelType;

  private timer : any;

  private cryptogrService : CryptogrService;



  constructor(cryptogrService: CryptogrServiceImpl) {
    super();
    this.cryptogrService = cryptogrService;
  }

  ngOnInit(): void {
    this.toggleLoginUsageBasedOnGlobalOverride();
  }



  public change() : void {
    this.autosaveEnvs();
  }

  /**
   *  If user change login enabled setting by hand, chynge its default too
   */
  public changeUseLoginByHand(id : number) {
    this.enviroments
      ?.filter((enviroment : DataSetsNgModelRecordFormat) => enviroment.id === id)
      .forEach((enviroment : DataSetsNgModelRecordFormat) => {
        enviroment.useLoginDefault = enviroment.useLogin;
      })
  }

  public addEnvitoment() : void {
    this.createNewEnvArticle();
  }

  public removeEnviroment(event : any) : void {
    this.removeEnvArticle(event.target.value);
  }

  public isLastEnviroment() : boolean {
    return this.enviroments !== undefined && this.enviroments.length < 2;
  }

  public loginIsDisabledByOverride(enviromentId : number) : boolean {
    return this.enviroments
        ?.find((enviroment : DataSetsNgModelRecordFormat) =>
          enviroment.id === enviromentId && enviroment.useLogin === false && enviroment.useLoginDefault === true)
      !== undefined
  }



  private autosaveEnvs() : void {
    if (!BaseUtil.deepCompare(this.enviroments, this.enviromentsBefore)) {
      let context = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(function() {
          //FIXME hack because decorator's implementation is unable to detect changes
          // if is object and only attributes are changed
          context.enviroments = BaseUtil.deepClone(context.enviroments);
      }, DataSetsComponent.FIRE_TRESHOLD_MILISECONDS);
    }
  }

  private createNewEnvArticle() : void {
    let newId : number = (this.enviroments
      ?.map((env) => env.id)
      .reduce((prev, curr) => prev > curr ? prev : curr) ?? 0) + 1;
    let newEnv : DataSetsNgModelRecordFormat = BaseUtil
      .deepClone(DataSetsComponent.CONVERTER.storeConversion(DataSetsComponent.DEFAULT_ENV))
      ?.map((x) => ({
          id: newId,
          name: x.name + "_" + newId ,
          datasets: x.datasets
      }))
      .find((x) => x) as unknown as DataSetsNgModelRecordFormat;
    // appends to current enviromets settings section but do not save to store yet
    this.enviroments?.push(newEnv);
    // update options list in select current enviroment dropdown
    EventsUtil.notifySettingsEnviromentsChanged(this.enviroments);
  }

  private removeEnvArticle(id : number) : void {
    let indexToRemove = this.enviroments?.indexOf(
        this.enviroments?.find((x) => x.id === id) as DataSetsNgModelRecordFormat) ?? -1;
    // removes from settings list
    this.enviroments?.splice(indexToRemove, 1);
    // propagete this change to store
    this.change();
    // update options list in select current enviroment dropdown
    EventsUtil.notifySettingsEnviromentsChanged(this.enviroments);
  };

  private toggleLoginUsageBasedOnGlobalOverride() : void {
    EventsUtil.getSettingsUseLoginsEmitter().subscribe((result : boolean) => {
      this.enviroments?.forEach((enviroment : DataSetsNgModelRecordFormat) => {
        // prevent enabling login for enviroment that was not using login before
        if (enviroment.useLoginDefault && result) {
          enviroment.useLogin = true;
        } else if (enviroment.useLoginDefault && !result) {
          enviroment.useLogin = false;
        }
      });
      // trigger save action, again, unability of annotation to react if only object properties are changed
      this.autosaveEnvs();
    });
  }

}
