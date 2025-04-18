import   { toast }  from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg,{
        positin : "top-right"
    })
}

export const handleError = (msg) => {
    toast.error(msg,{
        positin : "top-right"
    })
}