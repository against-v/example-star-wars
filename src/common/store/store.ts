import { makeAutoObservable } from 'mobx';

export class Store {
  constructor() {
    makeAutoObservable(this);
  }

  public page: string = '1';

  public search: string = '';

  setPage(val: string) {
    this.page = val;
  }

  setSearch(val: string) {
    this.search = val;
  }
}
