
import { forwardRef } from 'react';
import cn from 'classnames';

import { IInputProps } from './Input.props';
import styles from './styles.module.css';


export const Input = forwardRef<HTMLInputElement, IInputProps>(function Input
    ({isValid = true, className, ...props}, ref) {
	return (
        <>
            <input className={cn(styles['input'], className,
            {[styles['invalid']]: !isValid})}
            {...props} ref={ref}></input>
        </>
	);
});