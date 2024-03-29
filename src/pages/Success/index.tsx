import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "../../components/Button";

export const Success = () => {

   const navigate = useNavigate();

   return (
      <div className={styles['success']}>
         <img src="pizza.png" alt="Изображение пиццы" />
         <div className={styles['text']}>Ваш заказ успешно<br/>оформлен!</div>
         <Button appearence="big" onClick={() => navigate('/')}>Сделать новый</Button>
      </div>
   );
};