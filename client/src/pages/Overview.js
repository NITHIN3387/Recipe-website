import { useEffect } from "react";
import Carousel from "../components/Carousel";
import ActiveTab from "../utils/ActiveTab";
import '../assets/styles/pages/loadAnimation.css'
import { SuggestionSection } from "../components/SuggestionSection";
import { useOutletContext } from "react-router-dom";

export default function Overview() {
    const {user, auth} = useOutletContext() || []
    
    useEffect(() => {
        // this will update the active tab in side navbar
        ActiveTab(0, 0)
    },[])

    return(
        <div className="load-animation mt-5" style={{overflowY: 'auto', overflowX: 'hidden'}}>
            <Carousel />
            <SuggestionSection title={'Top recipies in our community'} user={user} auth={auth} />
        </div>
    )
}