import {JSX} from "react";


type ArticleTableProps = {
    table: { id: string; text: string }[],
};

export default function ArticleTableOfContent({table}:ArticleTableProps): JSX.Element {

    return (
        <nav>
            <ul>
                {table.map(item=>(
                    <li key={item.id}><a href={`#${item.id}`}>{item.text}</a></li>
                ))}
            </ul>
        </nav>
    );
}
