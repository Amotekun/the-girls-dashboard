"use client"


import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

// useStoreModal here is used to open the modal when it is not already opened
const SetupPage = () => {
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(() => {
    if(!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen])

  return null
}

export default SetupPage;

