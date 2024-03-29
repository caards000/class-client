import React, {ButtonHTMLAttributes, useMemo} from 'react';
import {Icon} from '@iconify/react';
import loadingLoop from '@iconify/icons-line-md/loading-loop';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "DEFAULT" | "PRIMARY" | "SUCCESS" | "GHOST" | "DANGER";
  size?: "SMALL" | "DEFAULT"
  outline?: boolean;
  loading?: boolean;
}

function Button({
                  variant = "DEFAULT",
                  size = "DEFAULT",
                  outline,
                  children,
                  className,
                  loading,
                  disabled,
                  ...props
                }: IProps) {
  const variantStyle = useMemo(() => {
    switch (variant) {
      case "DEFAULT":
        if (outline) {
          return `border border-2 border-slate-300 hover:border-slate-400 focus:ring focus:ring-slate-300 text-slate-700`;
        } else {
          return `bg-slate-500 hover:bg-slate-400 active:bg-slate-700 focus:ring focus:ring-slate-300 text-white`;
        }

      case "PRIMARY":
        if (outline) {
          return `border border-2 border-primary-normal hover:bg-primary-normal hover:text-white active:bg-primary-dark focus:ring focus:ring-primary-32 text-primary-normal`;
        } else {
          return `bg-primary-normal hover:bg-primary-light active:bg-primary-dark focus:ring focus:ring-primary-16 text-white`;
        }

      case "SUCCESS":
        if (outline) {
          return `border border-2 border-green-600 hover:bg-green-600 hover:text-white active:bg-green-500 focus:ring focus:ring-green-200 text-green-600`;
        } else {
          return `bg-green-600 hover:bg-green-500 active:bg-green-700 focus:ring focus:ring-green-200 text-white`;
        }

      case "DANGER":
        if (outline) {
          return `border border-2 border-red-600 hover:bg-red-600 hover:text-white active:bg-red-500 focus:ring focus:ring-red-200 text-red-600`;
        } else {
          return `bg-red-600 hover:bg-red-500 active:bg-red-700 focus:ring focus:ring-red-200 text-white`;
        }

      case "GHOST":
        return "hover:bg-slate-100";
    }
  }, [variant, outline]);

  const sizeStyle = useMemo(() => {
    switch (size) {
      case "SMALL":
        return "h-8 px-4";

      default:
        return "h-11 px-4";
    }
  }, [size])

  const style = useMemo(() => {
    if (loading || disabled) {
      return `bg-slate-300 text-white cursor-not-allowed`
    } else {
      return `${variantStyle}`;
    }
  }, [loading, disabled, variantStyle])

  return (
    <button
      className={`rounded typo-subtitle-small apply-transition flex items-center justify-center gap-1 ${sizeStyle} ${style} ${className}`}
      disabled={loading || disabled}
      {...props}>
      {loading ? <Icon icon={loadingLoop} width={24} height={24}/> : children}
    </button>
  );
}

export default Button;
