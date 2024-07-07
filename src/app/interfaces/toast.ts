

export enum ToastAction {
    Added,
    Completed,
    Uncompleted,
    Updated,
    Removed,
}

export enum ToastAnimation {
    Added = "animate-jump-in animate-once animate-duration-[1000ms]",
    Removed = "animate-jump-out animate-once animate-duration-[1000ms]"
}

export interface Toast {
    text: string,
    action: ToastAction
    animation: ToastAnimation
}