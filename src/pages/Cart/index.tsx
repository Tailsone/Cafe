import { useDispatch, useSelector } from "react-redux";
import { Title } from "../../components/Title";
import styles from "./styles.module.css";
import { TAppDispatch, TRootState } from "../../store/store";
import { CartItem } from "../../components/CartItem";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_FEE = 169;

export const Cart = () => {
   const items = useSelector((state: TRootState) => state.cart.items);
   const jwt = useSelector((state: TRootState) => state.user.jwt);
   const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
   const dispatch = useDispatch<TAppDispatch>();
   const navigate = useNavigate();
   
   useEffect (() => {
      loadAllItems();
   }, [items]);
    
   const getItem = async (id: number) => {
		const {data} = await axios.get(`${PREFIX}/products/${id}`);
		return data;
	};

   const loadAllItems = async () => {
      const res = await Promise.all(items.map(i => getItem(i.id)));
      setCartProducts(res);
   };

   const freeDelivery = 600;

   const checkout = async () => {
      await axios.post(`${PREFIX}/order`, {
         products: items
      }, {
         headers: {
            Authorization: `Bearer ${jwt}`
         }
      });
      dispatch(cartActions.cleanCart());
      navigate('/success');
   };

   const summary = items.map(i => {
      const product = cartProducts.find(p => p.id === i.id);
      if (!product) {
         return;
      }
      return i.count * product.price;
   }).reduce<number>((acc, i) => acc += Number(i), 0);
  
   
   return (
      <div className={styles.cart}>
         <Title className={styles.title}>Корзина</Title>
         {items.map(i => {
            const product = cartProducts.find(p => p.id === i.id);
            if (!product) {
               return;
            }
            return <CartItem key={product.id} count={i.count} {...product}/>;
         })}
         <div className={styles['summary-wrapper']}>
            <div className={styles['summary']}>
               <div>Итог</div>
               <div>{summary}&nbsp;
                  <span>₽</span>
               </div>
            </div>
            <hr/>
            <div className={styles['summary']}>
               <div>Доставка</div>
               <div>{summary && summary < freeDelivery ? DELIVERY_FEE
                  : 0}&nbsp;
                  <span>₽</span>
               </div>
            </div>
            <hr/>
            <div className={styles['summary']}>
               <div>Итог&nbsp;
                  <span>({items.length})</span>
               </div>
               <div className={styles['summary-delivery']}>
                  {summary >= freeDelivery && summary}
                  {summary === 0 && 0}
                  {summary < freeDelivery && summary > 1 && summary+DELIVERY_FEE}
                  <span>₽</span>
               </div>
            </div>
         </div>
         <div className={styles['checkout']}>
            <Button appearence="big" onClick={checkout}>Оформить</Button>
         </div>
      </div>
   );
};
