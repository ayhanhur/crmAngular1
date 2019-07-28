
import {ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { LoaderService } from './../../services/loader.service';
import {Component, OnInit} from '@angular/core';
// import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddTodoModalComponent} from './../modals/add-todo-modal/add-todo-modal.component';
import {TodolistService} from './../../services/todolist.service';
import {Todo} from 'app/classes/todo';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {

  newTodo: Todo;
  completed = [];
  onList = [];
  animation: string;
  checkStatus = [];
  isLoading: boolean;
  todo: Todo = new Todo();

  constructor(
      // private modalService: NgbModal,
      private modalService: ModalService,
      private todoDataService: TodolistService,
      private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.onList = [];
    this.todoDataService.checkList().subscribe(result => {
      if(result)
      {
      this.newTodo = result;
      this.loaderService.updateIndicator(false);
      }

    })
    this.loaderService.loaderIndicatorHandler.subscribe(result => {
      this.isLoading = result;
    })
  }
  
  addTodo(data) {
    this.animation = 'flipInX';
    this.todoDataService.addTodo({task:data});


  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    //this.animation = 'flipOutX';
    this.todoDataService.deleteTodoById(todo).subscribe(result => {
      if(result) {
        this.todoDataService.checkList().subscribe(result => {
          this.loaderService.updateIndicator(false);
          this.newTodo = result;
        })           
      }

    })
    
  }

  taskDone(id:number) {
    console.log("tiıkl",this.onList);
    if(this.onList.map(result => result.id).indexOf(id) == -1)
    {
      this.checkStatus[id] = false;
      this.completed[id] = true;
      this.onList.push({id:id});
    }
    else {
      this.completed[id] = false;
      this.checkStatus[id] = true;
      this.onList.splice(this.onList.findIndex(result => result.id == id),1);
    }   
  }

  get todos() {
    return this.newTodo;
  }
  

  convertDate(date:any) {
    let now = new Date().toLocaleDateString();
    if(date === now) {
      return 'Bugün';
    }
    else {
      return date;
    }

   
  }

    openModal() {
        const modalRef = this.modalService.open(AddTodoModalComponent);
        modalRef.result.then((result) => {
            console.log("Modal Result", result);
            if (result.success == true) {
                this.todoDataService.checkList().subscribe(result => {
                    this.completed = [];
                    this.checkStatus = [];
                    this.onList = [];
                    this.newTodo = result;
                    this.loaderService.updateIndicator(false);
                })
            }
        }, (reason) => {
            console.log("Get Dismiss Reason", this.getDissmissReason(reason));
        })
    }

    getDissmissReason(reason: any) {
        if (reason === ModalDismissReasons.ESC) {
            return 'ESC ye Bastın';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'Arkaplan Tıklaması';
        }
        else {
            return `${reason} ile`;
        }
    }

    closeModal() {

    }

}
