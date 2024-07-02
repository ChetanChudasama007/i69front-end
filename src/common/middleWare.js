
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export const Authenticated = (props) => {
    const {children} = props;
    const router = useRouter();
    const [token,setToken] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
        if (!token) {
            router.push('/landing');
        } else{
            setToken(true)
        }
    }, [router.isReady]);

    if(!token)
    return null;

    return <>{children}</>
};