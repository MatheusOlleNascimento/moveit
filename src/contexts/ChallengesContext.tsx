import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;    
}

interface ChallengeContextData {
    Level: number;
    CurrentExperience: number;
    experienceToNextLevel: number;
    ChallengesCompleted: number; 
    LevelUp: ()=> void;
    startNewChallenge:  ()=> void;    
    resetChallenge:  ()=> void;    
    completeChallenge:  ()=> void;    
    ActiveChallenge: Challenge;
}

interface ChallengeProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children} : ChallengeProviderProps){

    const [Level, setLevel] = useState(1);
    const [CurrentExperience, setCurrentExperience] = useState(0);
    const [ChallengesCompleted, setChallengesCompleted] = useState(0);
    
    const [ActiveChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((Level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function LevelUp(){
        setLevel(Level+ 1);
    }


    function startNewChallenge(){
        const randomChallengeIndex =  Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }

        new Audio('/notification.mp3').play();

        setActiveChallenge(challenge);
    }
    
    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!ActiveChallenge){
            return;
        }

        const { amount } = ActiveChallenge;
        let finalExperience = CurrentExperience + amount;

        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            LevelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(ChallengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider 
        value={
            {Level, 
            CurrentExperience, 
            ChallengesCompleted, 
            experienceToNextLevel,
            LevelUp,
            startNewChallenge,
            ActiveChallenge,
            resetChallenge,
            completeChallenge            
            }}>
            {children}
        </ChallengesContext.Provider>
    )
}