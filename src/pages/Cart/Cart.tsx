import { useSelector } from "react-redux";
import Headling from "../../components/Headllinig/Headling";
import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import type { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import type { RootState } from "../../store/store";
import styles from "./Cart.module.css";

const DELIVERY_FEE = 169;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);

  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <>
      <Headling className={styles["headling"]}>Корзина</Headling>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={product.id} count={i.count} {...product} />;
      })}
      <div>
        <div>Итог</div>
        <div>
          {items.map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
              return 0;
            }
            return i.count * product.price;
          }).reduce((acc, i) => acc += i, 0)}
        </div>
      </div>
      <hr />
      <div>Доставка</div>
      <div>{DELIVERY_FEE}</div>
      <hr />
      <div>
        <div>Итог {items.length}</div>
      </div>
    </>
  );
}
