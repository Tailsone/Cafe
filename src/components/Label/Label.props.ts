import { LabelHTMLAttributes, ReactNode } from 'react';

export interface ILabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode
}