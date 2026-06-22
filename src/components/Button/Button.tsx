import styles from "./Button.module.css";
import cn from "classnames";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  appearence?: "big" | "small";
}

function Button({
  children,
  className,
  appearence = "small",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(styles["button"], styles["accent"], className, {
        [styles["small"]]: appearence === "small",
        [styles["big"]]: appearence === "big",
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
