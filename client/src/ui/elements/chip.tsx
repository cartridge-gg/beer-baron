interface Props {
    title: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
    color: 'green' | 'red' | 'blue' | 'yellow';
}

const positionClassNames = {
    'top-left': 'absolute top-0 left-0',
    'top-right': 'absolute top-0 right-0',
    'bottom-left': 'absolute bottom-0 left-0',
    'bottom-right': 'absolute bottom-0 right-0',
    center: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
};

const colorClassNames = {
    green: 'bg-grass-100',
    red: 'bg-red-100',
    blue: 'bg-blue-100',
    yellow: 'bg-beer-100',
};

export const Chip = (props: Props) => {
    return (
        <div
            className={`${positionClassNames[props.position]} ${
                colorClassNames[props.color]
            } rounded px-2 text-sm uppercase shadow-lg border-2 border-black/10 shadow-xl text-dirt-300`}
        >
            {props.title}
        </div>
    );
};
