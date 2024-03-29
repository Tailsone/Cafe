import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Title } from '../../components/Title';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/product.interface';
import styles from './styles.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList';

export const Menu = () => {

   const [products, setProducts] = useState<IProduct[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | undefined>();
   const [filter, setFilter] = useState('');

   useEffect(() => {
      getMenu(filter);
   }, [filter]);

   const getMenu = async (name?: string) => {
      try {
         const {data} = await axios.get<IProduct[]>(`${PREFIX}/products/`, {
            params: {
               name: name
            }
         });
         setProducts(data);
         setIsLoading(false);
      } catch (e) {
         if (e instanceof AxiosError) {
            setError(e.message);
         }
         setIsLoading(false);
         return;
      }
   };

   
	return (
   <div className={styles.menu}>
      <div className={styles.title}>
         <Title>Меню</Title>
         <div className={styles['search-wrapper']}>
            <img src="/search-icon.svg" alt="Поиск" />
            <Input 
               className={styles.search} 
               value={filter} 
               placeholder='Введите блюдо или состав' 
               onChange={(e) => setFilter(e.target.value)}
            ></Input>
         </div>
      </div>
      <div>
         {error && <>{error}</>}
         {!isLoading && products.length > 0 && <MenuList products={products}/>}
         {isLoading && <>Загружаем продукты...</>}
         {!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
      </div>
   </div>
	);
};

export default Menu;