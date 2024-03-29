import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";

export const LayoutAuth = () => {
   return (
      <div className={styles["layout"]}>
         <div className={styles["logo"]}>
            <img src="/main-logo.svg" alt="Логотип компании" />
         </div>
         <div className={styles["content"]}>
            <Outlet />
         </div>
      </div>
   );
};