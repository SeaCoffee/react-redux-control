import React, { useEffect, useState } from 'react';

import Avatar from "@mui/material/Avatar";

import {userService} from "../../servises/axiosService";
import {UserApiResponse} from "../../interfaces/responseInterfaces";


export const UserInfo: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserApiResponse | null>(null);

    useEffect(() => {
        userService.getUserInfo().then(response => {
            const data = response.data as UserApiResponse;
            setUserInfo(data);
        }).catch(error => {
            console.error('Error loading user info:', error);
        });
    }, []);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    const avatarUrl = userService.getAvatarUrl(userInfo);

    return (
        <div>
            <Avatar
                alt={userInfo.username}
                src={avatarUrl}
                className="user-avatar"
            />
            <span>{userInfo.username}</span>
        </div>
    );
};
