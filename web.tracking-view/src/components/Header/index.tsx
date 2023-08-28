import smartLogo from "../../assets/smartenvios.svg";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <div className={styles.header}>
      <img src={smartLogo} />
    </div>
  );
};
