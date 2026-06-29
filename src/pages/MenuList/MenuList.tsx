import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./MenuList.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  image: string;
  rating: number;
}

export interface MenuListProps {
  products: Product[];
}

export function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles.wrapper}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          description={p.ingredients.join(", ")}
          rating={p.rating}
          price={p.price}
          image={p.image}
        />
      ))}
    </div>
  );
}
