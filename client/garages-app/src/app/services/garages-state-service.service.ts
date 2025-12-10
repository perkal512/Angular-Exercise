import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { GaragesService } from './garages.service';
import { Garage } from '../models/garage.model';

@Injectable({ providedIn: 'root' })
export class GaragesStateService {
  private _localGarages = new BehaviorSubject<Garage[]>([]);
  localGarages$ = this._localGarages.asObservable();

  private _govGarages = new BehaviorSubject<Garage[]>([]);
  govGarages$ = this._govGarages.asObservable();

  private _selectedGarages = new BehaviorSubject<Garage[]>([]);
  selectedGarages$ = this._selectedGarages.asObservable();

  constructor(private api: GaragesService) {}

  async loadLocalGarages(): Promise<{ ok: boolean; error?: AppError }> {
    try {
      const garages = await firstValueFrom(this.api.fetchLocalGarages());
      this._localGarages.next(garages ?? []);
      return { ok: true };
    } catch (err: any) {
      console.error('loadLocalGarages error', err);
      this._localGarages.next([]);
      return {
        ok: false,
        error: {
          message: err.error?.message || 'Failed to load local garages',
          status: err.status,
          raw: err
        }
      };
    }
  }

  async loadGovGarages(): Promise<{ ok: boolean; error?: AppError }> {
    try {
      const garages = await firstValueFrom(this.api.fetchGovGarages());
      this._govGarages.next(garages ?? []);
      return { ok: true };
    } catch (err: any) {
      console.error('loadGovGarages error', err);
      this._govGarages.next([]);
      return {
        ok: false,
        error: {
          message: err.error?.message || 'Failed to load gov garages',
          status: err.status,
          raw: err
        }
      };
    }
  }

  async addSelectedGarages(): Promise<{ ok: boolean; resp?: any; error?: AppError }> {
    const selected = this._selectedGarages.getValue();
    const current = this._localGarages.getValue();
    const toAdd = selected.filter(s => !current.some(c => c.externalId === s.externalId));

    if (!toAdd.length)
      return { ok: false, error: { message: 'No new garages to add' } };

    try {
      const resp = await firstValueFrom(this.api.addMultipleGarages(toAdd));

      const merged = [...current];
      (resp.added ?? []).forEach(g => {
        if (!merged.some(m => m.externalId === g.externalId)) merged.push(g);
      });
      this._localGarages.next(merged);

      this._selectedGarages.next([]);
      return { ok: true, resp };
    } catch (err: any) {
      console.error('addSelectedGarages error', err);
      return {
        ok: false,
        error: {
          message: err.error?.message || 'Failed to add selected garages',
          status: err.status,
          raw: err
        }
      };
    }
  }
}

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, firstValueFrom } from 'rxjs';
// import { GaragesService } from './garages.service';
// import { Garage } from '../models/garage.model';

// @Injectable({ providedIn: 'root' })
// export class GaragesStateService {
//   private _localGarages = new BehaviorSubject<Garage[]>([]);
//   localGarages$ = this._localGarages.asObservable();

//   private _govGarages = new BehaviorSubject<Garage[]>([]);
//   govGarages$ = this._govGarages.asObservable();

//   private _selectedGarages = new BehaviorSubject<Garage[]>([]);
//   selectedGarages$ = this._selectedGarages.asObservable();

//   constructor(private api: GaragesService) {}

//   async loadLocalGarages() {
//     try {
//       const garages = await firstValueFrom(this.api.fetchLocalGarages());
//       this._localGarages.next(garages ?? []);
//     } catch (err) {
//       console.error(err);
//       this._localGarages.next([]);
//     }
//   }

//   async loadGovGarages() {
//     try {
//       const garages = await firstValueFrom(this.api.fetchGovGarages());
//       this._govGarages.next(garages ?? []);
//     } catch (err) {
//       console.error(err);
//       this._govGarages.next([]);
//     }
//   }

//   selectGarages(garages: Garage[]) {
//     this._selectedGarages.next(garages);
//   }

//   async addSelectedGarages() {
//     const selected = this._selectedGarages.getValue();
//     const current = this._localGarages.getValue();
//     const toAdd = selected.filter(s => !current.some(c => c.externalId === s.externalId));

//     if (!toAdd.length) return { added: [], notAdded: [], message: 'No new garages to add' };

//     try {
//       const resp = await firstValueFrom(this.api.addMultipleGarages(toAdd));

//       const merged = [...current];
//       (resp.added ?? []).forEach(g => {
//         if (!merged.some(m => m.externalId === g.externalId)) merged.push(g);
//       });
//       this._localGarages.next(merged);

//       this._selectedGarages.next([]);

//       return resp;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   }
// }
