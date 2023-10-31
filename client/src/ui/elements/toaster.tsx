'use client';

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/ui/elements/toast';
import { useToast } from '@/ui/elements/use-toast';
import BeerBaronLogo from '../../icons/BeerBaronLogo.svg?react';

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast className="flex space-x-2" key={id} {...props}>
                        <img className="w-24" src="/images/ios/512.png" />
                        <div className="grid gap-1 ml-auto">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
