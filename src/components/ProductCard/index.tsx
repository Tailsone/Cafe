import { Link } from "react-router-dom";
import { IProductCardProps } from "./ProductCard.props";
import styles from "./styles.module.css";
import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { TAppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";

export const ProductCard = (props: IProductCardProps) => {

  const dispatch = useDispatch<TAppDispatch>();

  const add = (e : MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.addItem(props.id));
  };

  return (
    <Link to={`/product/${props.id}`}>
      <div className={styles["card"]}>
        <img className={styles["img"]} src={props.image} alt=""></img>
        <div className={styles["price"]}>
          <span>{props.price}</span>
          <span>₽</span>
        </div>
        <button type="button" className={styles["add-to-cart"]} onClick={add}>
          <img src="/add-to-cart.svg" alt="" />
        </button>
        <div className={styles["rate"]}>
          <span>{props.rating}</span>
          <img src="/rate-star.svg" alt="" />
        </div>
        <div className={styles["info"]}>
          <div className={styles["name"]}>{props.name}</div>
          <div className={styles["description"]}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
};
