import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds:number;
    HasFinished: boolean;
    IsActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}
interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children} : CountdownProviderProps){
    
    const { startNewChallenge } = useContext(ChallengesContext);

    const [Time, setTime] = useState(0.1 * 60);
    const [IsActive, setIsActive] = useState(false);
    const [HasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(Time / 60);
    const seconds = Time % 60;

    useEffect(() => {
        if(IsActive && Time > 0){
            countdownTimeout = setTimeout(()=> {
                setTime(Time - 1);
            }, 1000)
        }else if (IsActive && Time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [IsActive, Time])

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.1 * 60);
    }
    
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            HasFinished,
            IsActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}