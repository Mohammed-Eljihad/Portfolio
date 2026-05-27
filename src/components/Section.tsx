
import type { ReactNode } from "react";

type SectionProps = {
    id: string;
    className?: string;
    children: ReactNode;
}

export const Section = ({ id, className, children }: SectionProps) => {
    return (
        <section
            id={id}
            className={`py-32 relative overflow-hidden${className ? ` ${className}` : ""}`}>
            {children}
        </section>);
};