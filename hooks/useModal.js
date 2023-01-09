import { useGlobalContext } from "../lib/context"

export const useModal = ()=>{
    const {onOpen, onClose} = useGlobalContext()

    const  openAndClose = (type, message, duration) =>{
        onOpen(type=type, message=message)

        setTimeout(()=>{
            onClose()
        }, duration)
    }

    return {openAndClose}
}