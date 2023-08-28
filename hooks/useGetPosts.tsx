import { useState, useEffect } from 'react';
import * as apiClient from '../utilities/apiClient';
import { ItemWrap } from '../types';

export const useGetPosts = () => {
  const [posts, setPosts] = useState<ItemWrap[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    setRefreshing(true);
    try {
      const data = await apiClient.request('/content/getSift', 'POST', null);
      setPosts(data.items);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    refreshing,
    fetchPosts
  };
};
