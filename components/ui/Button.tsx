"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "outline" | "whatsapp" | "outline-cream";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
}

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.137.564 4.14 1.544 5.875L.057 23.272a.75.75 0 00.92.92l5.397-1.487A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.95-1.356l-.355-.211-3.685 1.015 1.015-3.686-.211-.355A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
);

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-green text-white border-2 border-green btn-slide btn-fill-green-dark active:scale-[0.98]",
  outline:
    "bg-transparent text-green border-2 border-green btn-slide btn-fill-green hover:text-white active:scale-[0.98]",
  "outline-cream":
    "bg-transparent text-cream border-2 border-cream btn-slide btn-fill-cream hover:text-green active:scale-[0.98]",
  whatsapp:
    "bg-green text-white border-2 border-green btn-slide btn-fill-green-dark flex items-center gap-2 active:scale-[0.98]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      as: Tag = "button",
      href,
      target,
      rel,
      fullWidth,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      clsx(
        "inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-sm font-medium tracking-widest uppercase rounded-none cursor-pointer select-none",
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )
    );

    if (Tag === "a" && href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className={classes}
          aria-label={typeof children === "string" ? children : undefined}
        >
          {variant === "whatsapp" && <WhatsAppIcon />}
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {variant === "whatsapp" && <WhatsAppIcon />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
