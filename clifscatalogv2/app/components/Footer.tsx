import FooterStyles from '../modular_css/Footer.module.css';
import '../globalStyles.css';
import Image from 'next/image';

export const Footer = () => {


    return (
        <section className={FooterStyles.container}>
            <div className={FooterStyles.imageDiv}>
                <Image width={150} height={150} alt="Clif Catalog logo" src="/next.svg"/>
            </div>
            <div className={FooterStyles.mainDiv}>
                <h1>Footer Content</h1>
            </div>
        </section>
    )
}