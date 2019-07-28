
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Todo} from './../classes/todo';
import {environment as Env} from './../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class TodolistService {
  apiUrl = Env.api.mock;
  endPoint = '/todolist';
  lastId: number = 0;
  getList:BehaviorSubject<any> = new BehaviorSubject(null);
  todos = [];

    constructor(private httpClient: HttpClient) {

    }

    /* Simulate POST */
    addTodo(todo): Observable<any> {
        return this.httpClient.post(this.apiUrl + this.endPoint, todo)
    }

    checkList(): Observable<any> {
        return this.httpClient.get(this.apiUrl + this.endPoint);
    }

    getTodoById(id: number): Todo {
        return this.todos.filter(todo => todo.id === id).pop()
    }

    deleteTodoById(id: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + this.endPoint + '/' + id);
        /* this.todos = this.todos.filter(filterTodo =>  filterTodo.id !== id);
         return this;*/
    }

    // Simulate Put toddo/:id
    updateTodoById(id: number, values: Object = {}) {
        let todo = this.getTodoById(id);
        if (!todo) {
            return null;
        }
        Object.assign(todo, values);
        return todo;
    }

    getAllTodos() {

    }

    toggleTodoComplete(todo: Todo) {
        let updateTodo = this.updateTodoById(todo.id, {
            complete: !todo.completed
        })

        return updateTodo;
    }

    private setHeaders(headers: HttpHeaders | null) {
        headers = headers || new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');

        return {
            headers: headers
        }
    }

}
