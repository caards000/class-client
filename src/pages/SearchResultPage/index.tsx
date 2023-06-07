import Container from "../../components/Container";
import {useNavigate, useSearchParams} from "react-router-dom";

function SearchResultPage(){
    const navigate = useNavigate();
    const[searchParam] = useSearchParams();
    const type = searchParam.get("type");

    const handleChangeTab = (e: string) => {
        navigate(`/search?query=${searchParam.get("query")}&type=${e}`)
    }

    return(
        <Container className="py-5">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-10">
            <div></div>
            <div>
                <div className="mb-7">
                    <p>Search Result for:</p>
                    <h3>{searchParam.get("query")}</h3>
                </div>
                <ul className="grid grid-cols-4 lst">
                    <li className={type === "group" ? "active" : ""}
                        onClick={()=> handleChangeTab("group")}>Groups</li>

                    <li className={type === "post" ? "active" : ""}
                        onClick={()=> handleChangeTab("post")}>Posts</li>

                    <li className={type === "classroom" ? "active" : ""}
                        onClick={()=> handleChangeTab("classroom")}>Classrooms</li>

                    <li className={type === "people" ? "active" : ""}
                        onClick={()=> handleChangeTab("people")}>People</li>
                </ul>
            </div>
            <div></div>
        </div>
        </Container>
    )
}
export default SearchResultPage