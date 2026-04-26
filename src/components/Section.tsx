

type SectionProps = {
    id: string;
    className?: string;
    children: React.ReactNode;
}

export const Section = ({ id, className, children }: SectionProps) => {
    return (
        <section
            id={id}
            className={className && "py-32 relative overflow-hidden"}>
            {children}
        </section>);
};