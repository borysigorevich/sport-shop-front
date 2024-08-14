import React, { ComponentProps } from "react"
import {Button as MedusaButton} from '@medusajs/ui'
import { cn } from '@lib/util/cn';

type ButtonProps = {

} & Omit<ComponentProps<typeof MedusaButton>, 'key'>

export const Button = ({children,className, ...props}: ButtonProps) => {
 return (
  <MedusaButton
    className={cn(className, 'rounded-none [&_div]:rounded-none')}
    {...props}
  >
    {children}
  </MedusaButton>
 );
};