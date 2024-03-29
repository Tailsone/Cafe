
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Title } from '../../components/Title';
import styles from './styles.module.css';
import { FormEvent, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch, TRootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';


export interface ILoginForm {
    email: {
        value: string;
    }
    password: {
        value: string;
    }
}

export const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<TAppDispatch>();
    const {jwt, loginErrorMessage} = useSelector((state: TRootState) => state.user);
    
    useEffect(() => {
        if(jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submitLogin = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = e.target as typeof e.target & ILoginForm;
        const {email, password} = target;
        await dispatch(login({email: email.value, password: password.value}));
    };

	return (
        <div className={styles.login}>
            <Title>Вход</Title>
            <form onSubmit={submitLogin} className={styles['form']}>
                <div className={styles['input-wrapper']}>
                    <Label htmlFor='email'>Ваш email</Label>
                    <Input name='email' id='email' type='email' placeholder='Email'></Input>
                </div>
                <div className={styles['input-wrapper']}>
                    <Label htmlFor='password'>Ваш пароль</Label>
                    <Input name='password' id='password' type='password' placeholder='Пароль'></Input>
                </div>
                <div className={styles.error}>{loginErrorMessage}</div>
                <div className={styles['button-wrapper']}>
                    <Button type='submit' appearence={'big'}>вход</Button>
                </div>
            </form>
            <div className={styles['links-wrapper']}>
                <span>Нет аккаунта?</span>
                <Link to={'/auth/register'}>Зарегистрироваться</Link>
            </div>
        </div>
	);
};