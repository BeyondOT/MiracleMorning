import { FC, ReactElement } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";
interface ButtonProps {
  icon: ReactElement;
  title: string;
  link: string;
}

const Navbar = () => {
  const NavButton: FC<ButtonProps> = ({ icon, title, link }) => {
    return (
      <NavLink to={link}>
        <div>{icon}</div>
        <span>{title}</span>
      </NavLink>
    );
  };
  return (
    <div className={styles.navbar}>
      <NavButton
        icon={<IoPersonOutline />}
        title={"Profile"}
        link={"/profile"}
      />
      <NavButton icon={<IoPersonOutline />} title={"Check In"} link={"/"} />
      <NavButton icon={<IoPersonOutline />} title={"Day"} link={"/checkedin"} />
    </div>
  );
};
export default Navbar;
