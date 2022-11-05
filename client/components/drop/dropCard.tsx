import { FC } from "react";
import { DropType } from "../../types/types";


const DropCard: FC<{drop: DropType}> = ({drop}) => {

    return (
        <div className="">{drop.author.username}</div>
    )
};

export default DropCard;