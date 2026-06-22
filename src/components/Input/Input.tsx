import styles from "./Input.module.css";
import cn from "classnames";
import { ReactNode, InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input className={cn(styles["input"], className)} ref={ref} {...props} />
    );
  },
);

export default Input;
