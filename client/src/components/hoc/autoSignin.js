import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { autoSignin } from "../../store/actions";


const AutoSignin = (props) => {

    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(autoSignin()).then(
            () => {
                setLoading(false)
            }
        );

    },[dispatch]);

    if (loading) {
        return (
            <div className="main_loader">
                <div className="lds-heart" >
                    <div>

                    </div>
                </div>
            </div>
        )
        
    } else {
        
        return (
            <>
                {props.children}
            </>
        )
        
    }


};

export default  AutoSignin;