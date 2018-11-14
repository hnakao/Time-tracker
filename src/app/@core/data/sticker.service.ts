import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { GlobalService } from './global.service';
import { Sticker } from '../models/sticker';
import { Instance } from '../models/instance';

@Injectable()
export class StickerService {

  private baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}api/stickersets`;
  }

  getStickers() {
    return this.http.get<Sticker[]>(this.baseUrl);
  }

  getSticker(id: string) {
    return this.http.get<Sticker>(`${this.baseUrl}/${id}`);
  }

  createSticker(sticker: Sticker) {
    return this.http.post(this.baseUrl, sticker);
  }

  updateSticker(sticker: Sticker) {
    return this.http.put(`${this.baseUrl}/${sticker._id}`, sticker);
  }

  deleteSticker(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getInstances(id: string) {
    return this.http.get<Instance[]>(`${this.baseUrl}/${id}/instances`);
  }

  // POST api/stickersets/{idStickerSet}/generate_instances
  generateInstance(id: string) {
    return this.http.post(`${this.baseUrl}/${id}/generate_instances/`, {});
  }
}
