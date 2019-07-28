import {AuthenticationService} from '../../../services/authentication.service';


import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';
import {TodolistService} from './../../../services/todolist.service';
import {ModalService} from '../../../services/modal.service';

@Component({
    selector: 'app-add-todo-modal',
    templateUrl: './add-todo-modal.component.html',
    styleUrls: ['./add-todo-modal.component.scss']
})
export class AddTodoModalComponent implements OnInit {
    todoForm: FormGroup;
    @Input() name;
    @Input() time;
    @Input() date;
    @Input() value;
    @Input() subvalue;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilderFactory: FormBuilder,
        private todoListService: TodolistService,
        private authService: AuthenticationService,
        private modalService: ModalService
    ) {
        this.createTodo();
    }

    ngOnInit() {
        console.log('Value', this.value);
    }

    createTodo() {
        this.todoForm = this.formBuilderFactory.group({
            task: ['', Validators.required],
            subtask: ['', Validators.required],
            date: [''],
            time: [''],
            isVisible: true,
            status: 0,
            userID: ['']
        })
    }

    timeResult(event) {
        this.time = event.time.hour + ':' + event.time.minute;
    }

    dateResult(event) {
        this.date = event.day + '.' + event.month + '.' + event.year;
        console.log(this.date);
    }

    onSubmit() {
        this.todoForm.patchValue({date: this.date, time: this.time, userID: this.authService.getPersonId()});
        const formModel = this.todoForm.value;
        this.todoListService.addTodo(formModel).subscribe(result => {
            if (result) {
                this.activeModal.close({success: true});
            }
        })
    }
    closeModal() {
        console.log('Modal Close');
        this.activeModal.dismiss('Close By User');
    }

}
