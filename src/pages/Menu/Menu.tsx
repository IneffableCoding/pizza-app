import Headling from "../../components/Headllinig/Headling";
import Search from "../../components/Search/Search";
import styles from "./Menu.module.css";
import { PREFIX } from "../../helpers/API";
import { useState, useEffect } from "react";
import { MenuList } from "../MenuList/MenuList";
import axios, { AxiosError } from "axios"; 

interface Product {
  id: number;
  name: string;
  price: number;
  ingredients: string[];
  image: string;
  rating: number;
}

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getMenu = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={styles["head"]}>
        <Headling>Menu</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <>Загружаем продукты...</>}
      </div>
    </>
  );
}

export default Menu;