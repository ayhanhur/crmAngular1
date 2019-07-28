import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
    animate = 'flyRight'; // you can override any options available
    newestOnTop = true;
    showCloseButton = true;
    maxShown = 1;
    toastLife = 3000;
}