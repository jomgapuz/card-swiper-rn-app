import {action, makeObservable, observable} from 'mobx';

export default class BaseStore<Data extends object> {
  data: Data;

  constructor(defaultData: Data) {
    this.data = defaultData;

    makeObservable(this, {
      data: observable.shallow,
      set: action,
    });
  }

  set = <Key extends keyof Data>(values: Partial<Data>) => {
    (Object.entries(values) as [Key, Data[Key]][])
      //
      .forEach(([key, value]) => {
        this.data[key] = value;
      });
  };
}
