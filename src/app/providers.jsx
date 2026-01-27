'use client';

import {NextUIProvider} from '@nextui-org/react';
import { CartProvider } from '@/context/CartContext';

export function Providers({children}) {
  return (
    <NextUIProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </NextUIProvider>
  );
}
