import React, { useState } from 'react';
import useShowToast from './useShowToast';
import { collection, query, where, getDocs, startAt, endAt } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUsers([]);
    try {
      const q = query(
        collection(firestore, 'users'),
        where('username', '>=', username),
        where('username', '<=', username + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        showToast('Error', 'User not found', 'error');
        setUsers([]);
      } else {
        const userList = [];
        querySnapshot.forEach((doc) => {
          userList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(userList);
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, users, setUsers };
};

export default useSearchUser;
