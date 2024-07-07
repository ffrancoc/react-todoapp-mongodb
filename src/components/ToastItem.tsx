import { Toast, ToastAction, ToastAnimation } from "@/app/interfaces/toast"
import { useEffect, useState } from "react"

type Props = {
    toast: Toast
}

function ToastItem({ toast }: Props) {
    const [toastBg, setToastBg] = useState('')
    const [animation, setAnimation] = useState(toast.animation)


    useEffect(() => {
        switch (toast.action) {
            case ToastAction.Added:
                setToastBg("text-white bg-green-500")
                break

            case ToastAction.Completed:
            case ToastAction.Uncompleted:
                setToastBg("text-white bg-black")
                break

            case ToastAction.Updated:
                setToastBg("text-white bg-purple-500")
                break

            case ToastAction.Removed:
                setToastBg("text-white bg-red-500")
                break

            default:
                setToastBg("text-white bg-black")
                break
        }

        setTimeout(() => {
            setAnimation(ToastAnimation.Removed)
        }, 2005)
    }, [animation])

    return (
        <p className={`${animation} ${toastBg} p-2 rounded-lg`}>{toast.text}</p>
    )
}

export default ToastItem