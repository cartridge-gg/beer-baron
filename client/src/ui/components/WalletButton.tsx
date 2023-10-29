import { useDojo } from "@/DojoContext";
import { Button } from "../elements/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/elements/select"
import { shortenHex } from "@/utils";


export const WalletButton = () => {
    const {
        account: { create, list, select, account, isDeploying, clear }
    } = useDojo();

    return (
        <div className="flex">
            <Button onClick={create}>{isDeploying ? "deploying burner" : "create burner"}</Button>
            <Select onValueChange={(value) => select(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup defaultValue={account.address}>
                        {list().map((account) => {
                            return (
                                <div className="flex">
                                    <SelectItem value={account.address}>{shortenHex(account.address)}</SelectItem>
                                    <Button size={'sm'} variant={'outline'} onClick={clear}>X</Button>
                                </div>
                            )
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}   