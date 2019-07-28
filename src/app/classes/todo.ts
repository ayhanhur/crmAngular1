export class Todo {
    id: number;
    userID:number;
    task:string = '';
    status:number = 0;
    taskDate = new Date();
    isVisible:boolean = true;
    taskTime = new Date();
    completed: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}