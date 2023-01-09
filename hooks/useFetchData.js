import { useCallback, useEffect, useState } from "react"

export const useFetchData = (url)=>{
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getData = useCallback(async()=>{
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        const responseData = await response.json()
        setData(responseData)
        console.log(responseData)
        setIsLoading(false)
    }, [url])

    useEffect(() => {
        getData()
    }, [])
    
    return {isLoading, data, getData}
}