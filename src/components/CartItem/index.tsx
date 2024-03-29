import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { TAppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { MouseEvent } from "react";
import { ICartItemProps } from "./CartItem.props";

export const CartItem = (props: ICartItemProps) => {
   const dispatch = useDispatch<TAppDispatch>();

   const increase = (e: MouseEvent) => {
      e.preventDefault();
      dispatch(cartActions.addItem(props.id));
   };

   const decrease = (e: MouseEvent) => {
      e.preventDefault();
      dispatch(cartActions.removeItem(props.id));
   };

   const remove = (e: MouseEvent) => {
      e.preventDefault();
      dispatch(cartActions.deleteItem(props.id));
   };

   return (
      <div className={styles["item-wrapper"]}>
         <div className={styles['item']}>
         <div className={styles["img"]} style={{ backgroundImage: `url(${props.image})`}}></div>
         <div className={styles["description"]}>
            <div className={styles["name"]}>{props.name}</div>
            <div className={styles["price"]}>{props.price}&nbsp;₽</div>
         </div>
         </div>
         <div className={styles['actions']}>
         <button type="button" className={styles["button"]} onClick={decrease}>
            <img src="/cart/minus.svg" alt="Убрать" />
         </button>
         <div className={styles['item-count']}>{props.count < 10 ? `0${props.count}` : props.count }</div>
         <button type="button" className={styles["button"]} onClick={increase}>
            <img src="/cart/plus.svg" alt="Добавить" />
         </button>
         <button type="button" className={styles["remove"]} onClick={remove}>
            <img src="/cart/delete-item.svg" alt="Удалить из корзины" />
         </button>
         </div>
      </div>
   );
};