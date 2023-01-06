import {useState} from "react"; 
 
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); 
 
/** 
* This is a custom hook that can be used to submit a form and simulate an API call 
* It uses Math.random() to simulate a random success or failure, with 50% chance of each 
*/ 
const useSubmit = () => { 
 const [isLoading, setLoading] = useState(false); 
 const [response, setResponse] = useState(null); 
 
 const submit = async (url, data, method) => { 
   setLoading(true); 
   try { 
      if(method==='GET'){
        await fetch(url)
      }else{
        const res = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        })
        const resData = await res.json()
        setResponse({ 
          type: resData.detail.type, 
          message: resData.detail.message,
          data: resData.data 
        })
      }
   } catch (error) { 
      console.log(error)
      setResponse({ 
        type: 'error', 
        message: 'Something went wrong, please try again later!', 
      }) 
   } finally { 
     setLoading(false); 
   } 
 }; 
 
 return { isLoading, response, submit, setResponse }; 
} 
 
export default useSubmit;