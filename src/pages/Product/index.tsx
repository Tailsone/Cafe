import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Title } from "../../components/Title";
import styles from "./styles.module.css";
import { IProduct } from "../../interfaces/product.interface";
import { Suspense, MouseEvent } from "react";
import { Button } from "../../components/Button";
import { cartActions } from "../../store/cart.slice";
import { useDispatch } from "react-redux";
import { TAppDispatch } from "../../store/store";


export const Product = () => {
   const data = useLoaderData() as { data: IProduct };
   const navigate = useNavigate();
   const dispatch = useDispatch<TAppDispatch>();

   const add = (e : MouseEvent, id: number) => {
      e.preventDefault();
      dispatch(cartActions.addItem(id));
   };
     
   return (
      <Suspense fallback={'Загрузка данных...'}>
         <Await resolve={data.data}>
            {({ data }: { data: IProduct }) => (
               <div>
                  <div className={styles['title-wrapper']}>
                     <button className={styles['back']} type="button" onClick={() => navigate(-1)}>
                        <img src="/back.svg" alt="Вернуться назад" />
                     </button>
                     <Title>{data.name}</Title>
                     <Button className={styles['to-cart-button']} onClick={(e) => add(e, data.id)}>
                        <img src="/add-to-cart.svg" alt="Положить в корзину" />
                        В корзину
                     </Button>
                  </div>
                  <div className={styles['product']}>
                     <img src={data.image} alt="Изображение блюда" />
                     <div className={styles['description']}>
                        <div className={styles['price']}>
                           Цена
                           <span>{data.price}&nbsp;
                              <span>₽</span>
                           </span>
                        </div>
                        <div className={styles['rate-wrapper']}>Рейтинг
                           <div className={styles["rate"]}>
                              <span>{data.rating}</span>
                              <img src="/rate-star.svg" alt="" />
                           </div>
                        </div>
                        <div>Состав:
                           <ul>
                              {data.ingredients.map((i, idx) => 
                              <li key={idx} className={styles['ingridients']}>{i}</li>)}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </Await>
      </Suspense>
   );
};