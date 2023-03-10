import React, {useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import Loading from "../component/common/Loading";
import {useNavigate} from 'react-router-dom';
import {postAuthCallback} from "../api/user";
import {set} from "../store";

const Callback = () => {
    const {isLoading, error, getIdTokenClaims, isAuthenticated, user} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const postData = async () => {
            const token = await getIdTokenClaims();
            const response = await postAuthCallback(token.__raw);
            if (isAuthenticated) {
                await set("token", response);
                await set("user", JSON.stringify(user));
            }
        }

        if (!isLoading && !error) {
            postData().then(() => navigate("/"));
        }
    }, [isLoading, error]);

    return (<Loading/>);
};

export default Callback;
