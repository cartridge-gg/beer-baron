import FlorishLeft from "../../icons/Flourish-Left.svg?react"
import FlorishRight from "../../icons/Flourish-Right.svg?react"


interface FancyTitleProps {
    title: string;

}

export const FancyTitle = ({ title }: FancyTitleProps) => {
    return (
        <div className=" flex justify-between space-x-2">
            <FlorishLeft className="self-center" />
            <div className="px-6 text-beer-100 rounded-xl bg-dirt-300 capitalise mx-3 ">
                <h3 className="">{title}</h3>
            </div>

            <FlorishRight className="self-center" />
        </div>

    )
}