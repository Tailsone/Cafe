
import { ILabelProps } from './Label.props';
import styles from './styles.module.css';
import cn from 'classnames';


export const Label = ({children, className, ...props}: ILabelProps) => {
	return (
        <>
            <label className={cn(styles['label'], className)} {...props}>{children}</label>
        </>
	);
};

