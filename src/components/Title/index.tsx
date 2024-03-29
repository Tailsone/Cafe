import { ITitleProps } from "./Title.props";
import styles from "./styles.module.css";
import cn from "classnames";

export const Title = ({ children, className, ...props }: ITitleProps) => {
  return (
      <h1 className={cn(styles["title"], className, { ...props })}>{children}</h1>
  );
};
