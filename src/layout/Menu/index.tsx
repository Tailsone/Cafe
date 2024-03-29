import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { Button } from '../../components/Button';

import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { loadProfile, userActions } from '../../store/user.slice';

import { TAppDispatch, TRootState } from '../../store/store';
import { useEffect } from 'react';


export const LayoutMenu = () => {
    const dispatch = useDispatch<TAppDispatch>();
    const navigate = useNavigate();
    const items = useSelector((state: TRootState) => state.cart.items);
    

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    const {profile} = useSelector((state: TRootState) => state.user);

    useEffect(() => {
        dispatch(loadProfile());
    }, [dispatch]);

	return (
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>
                <div>
                    <div className={styles['user-avatar']}>
                        <img src="/avatar.svg" alt="Аватар пользователя" />
                    </div>
                    <div>
                        <div className={styles.user}>{profile?.name}</div>
                        <div className={styles['user-email']}>{profile?.email}</div>
                    </div>
                    <div className={styles['menu']}>
                        <NavLink to='/' className={({isActive}) => cn(styles.link, {
                            [styles.active]: isActive
                        })}>
                            <img src="/menu-icon.svg" alt="Меню" />
                            Меню
                        </NavLink>
                        <NavLink to='/cart' className={({isActive}) => cn(styles.link, {
                            [styles.active]: isActive
                        })}>
                            <img src="/cart-icon.svg" alt="Корзина" />
                            Корзина
                            <div className={styles['cart-counter']}>
                                {items.reduce((acc, i) => acc += i.count, 0)}
                            </div>
                        </NavLink>
                    </div>
                </div>
                <Button onClick={logout} className={styles['logout-btn']}>
                    <img src="/logout.svg" alt="" />
                    Выйти
                </Button>
            </div>
            <div className={styles['content']}>
                <Outlet/>
            </div>
        </div>
	);
};