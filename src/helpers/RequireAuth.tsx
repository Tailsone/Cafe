import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { TRootState } from "../store/store";


export const RequireAuth = ({children} : {children: ReactNode}) => {
   const jwt = useSelector((state: TRootState) => state.user.jwt);
   
   if (!jwt) {
      return (
         <Navigate to='/auth/login' replace/>
      );
   }
   return children;
};
