
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Title } from '../../components/Title';
import styles from './styles.module.css';
import { FormEvent, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TAppDispatch, TRootState } from '../../store/store';
import { userActions, register } from '../../store/user.slice';


export interface IRegisterForm {
    email: {
        value: string;
    }
    password: {
        value: string;
    }
    name: {
        value: string;
    }
}

export const RegisterPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch<TAppDispatch>();
    const {jwt, registerErrorMessage} = useSelector((state: TRootState) => state.user);
    
    useEffect(() => {
        if(jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submitLogin = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = e.target as typeof e.target & IRegisterForm;
        const {email, password, name} = target;
        await dispatch(register({email: email.value, password: password.value, name: name.value}));
    };


	return (
        <div className={styles.login}>
            <Title className='title'>Регистрация</Title>
            <form onSubmit={submitLogin} className={styles['form']}>
                <div className={styles['input-wrapper']}>
                    <Label htmlFor='email'>Ваш email</Label>
                    <Input name='email' id='email' type='email' placeholder='Email'></Input>
                </div>
                <div className={styles['input-wrapper']}>
                    <Label htmlFor='password'>Ваш пароль</Label>
                    <Input name='password' id='password' type='password' placeholder='Пароль'></Input>
                </div>
                <div className={styles['input-wrapper']}>
                    <Label htmlFor='name'>Ваше имя</Label>
                    <Input name='name' id='name' type='text' placeholder='Имя'></Input>
                </div>
                <div className={styles.error}>{registerErrorMessage}</div>
                <div className={styles['button-wrapper']}>
                    <Button type='submit' appearence={'big'}>Зарегистрироваться</Button>
                </div>
            </form>
            <div className={styles['links-wrapper']}>
                <span>Есть аккаунт?</span>
                <Link to={'/auth/login'}>Войти</Link>
            </div>
        </div>
	);
};