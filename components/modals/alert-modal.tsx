"use client"

import { useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}: AlertModalProps) => {

    const [isMounted, setIsMounted] = useState(false);

    return (
        <Modal
            title="Are you sure?"
            description="This action cannot be reversible"
            isOpen = {isOpen}
            onClose = {onClose}
        >
            <div className="space-x-4 pt-6 flex utems-center justify-center w-full">
                <Button
                    disabled={loading}
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    disabled={loading}
                    variant="destructive"
                    onClick={onConfirm}
                >
                    Continue
                </Button>
            </div>
        </Modal>
    )
}