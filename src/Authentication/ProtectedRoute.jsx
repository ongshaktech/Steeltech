
import { useState } from "react";
import { useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { AuthLogin } from "../Hooks/firebaseFuncs";
import { GetCookie } from "./Cookies";
import { doc, getDoc } from "firebase/firestore";
import { db_firestore } from "../Hooks/config";

export const ProtectedRoute = ({ permission, children }) => {
    let [UserPermissions, setUserPermissions] = useState({});

    // Get Permission Lists
    // If permission is `true`, then render the children
    useEffect(
        () => {
            AuthLogin('users', GetCookie('email'), GetCookie('pswd')).then(
                (response) => {
                    if (response[0]) {
                        let access = response[1][0]['access'];

                        console.log("access", access)

                        const docRef = doc(db_firestore, "permissions", access);
                        getDoc(docRef).then(
                            (docSnap) => {
                                if (docSnap.exists()) {
                                    setUserPermissions(docSnap.data());
                                }
                            }
                        );
                    }
                }
            );
        }, []
    );

    console.log("UserPermissions", UserPermissions)

    return (
        UserPermissions[permission] ?
            children :
            <div className="flex justify-center items-center min-h-screen">
                <Triangle
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    visible={true} />
            </div>
    );
}