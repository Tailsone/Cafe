import { ReactNode } from 'react';


export interface ITitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode
}