
import { ProductCard } from "../../../components/ProductCard";
import { IMenuListProducts } from "./MenuList.props";
import styles from './styles.module.css';

export const MenuList = ({ products }: IMenuListProducts) => {
   return (
      <div  className={styles['menu-cards']}>
         {products.map((p) => (
            <ProductCard
               key={p.id}
               id={p.id}
               name={p.name}
               description={p.ingredients.join(", ")}
               image={p.image}
               price={p.price}
               rating={p.rating}
            />
         ))}
      </div>
   );
};
