import Link from 'next/link';
import '../globalStyles.css';
import HeroSectionStyles from '../modular_css/HeroSection.module.css';
import { SearchBar } from '../functional_components/search/SearchBarNoUser';
import SousChef from '../functional_components/chat/SousChef';
import { RandomMealButton } from '../functional_components/random_meal/RandomMealButton';
import Image from 'next/image';

export const HeroSection = () => {


    return (
        <>
        <div className={HeroSectionStyles.container}>     
            <div className={HeroSectionStyles.searchBar}>
                    <SearchBar session={null} />
            </div>
            <div className={HeroSectionStyles.heroText}>
                <h1>Find Your <span className={HeroSectionStyles.nameSpan}>Next Meal</span></h1>
                <h4 className={HeroSectionStyles.desktopH4}>Embark on a culinary journey with <span className={HeroSectionStyles.nameSpan}>Next Meal</span> - explore favorite recipes, save meals and personal preferences, 
                    and indulge in something new from randomly selected recipes.</h4>
                <div className={HeroSectionStyles.signInOptions}>
                    <p>Get started below</p>
                    <div className={HeroSectionStyles.buttons}>
                        <Link href={"/signup"} className={HeroSectionStyles.link}>Sign up</Link>
                        <Link href={"/signin"} className={HeroSectionStyles.link2}>Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
        <SousChef />
        <RandomMealButton session={null} />
        </>
    )
}