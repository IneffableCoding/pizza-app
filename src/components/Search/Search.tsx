import styles from "./Search.module.css";
import cn from "classnames";
import { forwardRef } from "react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={styles['input-wrapper']}>
        <input
          className={cn(styles["input"], className)}
          ref={ref}
          {...props}
        />
        <img className={styles['icon']} src="./search-icon.svg" alt="Иконка лупы" />
      </div>
    );
  },
);

export default Search;
