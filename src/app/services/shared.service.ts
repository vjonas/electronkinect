import {EventEmitter,Injectable} from '@angular/core';

@Injectable()
export class SharedService {
  getUserId: EventEmitter<String> = new EventEmitter();
}