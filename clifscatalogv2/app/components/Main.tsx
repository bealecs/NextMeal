import { HeroSection } from "./HeroSection";
import '../globalStyles.css';
import MainStyles from '../modular_css/Main.module.css';
import { Session } from "next-auth";

interface Props {
  session: Session;
}

export const Main = (props: Props) => {
  
  return (
    <main className={MainStyles.container}>
      <HeroSection session={props.session} />
    </main>
  );
};
