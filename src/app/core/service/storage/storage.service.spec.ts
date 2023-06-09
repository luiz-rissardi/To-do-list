import { TestBed } from '@angular/core/testing';
import {spy,stub} from "sinon";
import { StorageService, SaveListsInStorage, GetListsStorage  } from './storage.service';
import { TaskListModel } from '../../model/TaskList';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("teste do metodo getListsStorage",()=>{
    const mock:TaskListModel[] = [{
      titulo: '',
      descricao: '',
      tasks: [],
      id: ''
    }]
    const obj = new GetListsStorage();
    const spytest = stub(obj,"getListsStorage");
    const result = spytest.resolves([])
    console.log(result);
    

  })

});
