import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {

    const { Level } = useContext(ChallengesContext)
    
    return(
        <div className={styles.profileContainer}>
            <img src="http://github.com/matheusollenascimento.png" alt="Matheus Nascimento"/>
            <div>
                <strong>Matheus Nascimento</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {Level}
                </p>
            </div>
        </div>
    );    
};
