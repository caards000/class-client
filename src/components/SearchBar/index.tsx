import {Icon} from "@iconify/react";

interface IProps{

}

function SearchBar(props: IProps){
    const search = () =>{

    }
    return(
        <div className="flex items-center justify-center h-full">
            <form
            onClick={search}>
                <input
                    className="border p-1.5 w-[500px] m-2"
                    type="text"
                    name="search"
                    placeholder="Search for groups, posts or classrooms..."
                />
            </form>
        </div>
    )
}

export default SearchBar