import Image from "next/image";
import NavigationStyles from "../modular_css/Navigation.module.css";
import "../globalStyles.css";
import Link from "next/link";
import NavigationThemer from "../functional_components/NavigationThemer";
export const Navigation = () => {

  return (
    <section className={NavigationStyles.container}>
      <div className={NavigationStyles.imageDiv}>
        <Image
          width={80}
          height={80}
          style={{ borderRadius: "50%" }}
          alt="Clif Catalog logo"
          src="/logo.svg"
        />
      </div>
      <ul>
        <li className={NavigationStyles.navItem}>
          <Link href="#">My Dashboard</Link>
        </li>
        <li className={NavigationStyles.navItem}>
          <Link href="#">Search Recipes</Link>
        </li>
        <li className={NavigationStyles.navItem}>
          <Link href="/#">Pick for Me</Link>
        </li>
        <li className={NavigationStyles.navItem}>
          <Link href="#search-recipes">My Sous-chef</Link>
        </li>
        <NavigationThemer/>
      </ul>
    </section>
  );
};
