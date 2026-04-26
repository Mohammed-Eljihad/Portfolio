
type SectionHeaderProps = {
    isCenter?: boolean;
    spanTitle: string;
    sectionTitle: string;
    spanSectionTitle: string;
    paragraph: string;
};

export const SectionHeader = ({
        isCenter,
        spanTitle,
        sectionTitle,
        spanSectionTitle,
        paragraph
}: SectionHeaderProps) => {
    
    return (
        <div className={`${isCenter && "text-center mx-auto"} max-w-3xl mb-16`}>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
                {spanTitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                {sectionTitle}
                <span className="font-serif italic font-normal text-white">
                {" "}
                {spanSectionTitle}
                </span>
            </h2>
            <p className="text-muted-foreground animate-fade-in animation-delay-200">
                {paragraph}
            </p>
        </div>

    );
}