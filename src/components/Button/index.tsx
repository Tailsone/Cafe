
import { IButtonProps } from './Button.props';
import styles from './styles.module.css';
import cn from 'classnames';

export const Button = ({children, className, appearence, ...props}: IButtonProps) => {
	return (
		<button className={cn(
                  styles['button'],
                  styles['accent'], 
                  className,
                  {[styles['big']]: appearence === 'big'})}
                  {...props}>{children}
            </button>
	);
};