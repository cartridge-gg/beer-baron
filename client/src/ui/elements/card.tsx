export const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={`rounded-xl bg-dirt-300 rounded border border-dirt-100 flex text-white flex-wrap hover:bg-grass-200 hover:cursor-pointer hover:border-green-200 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
