import Logo from "./Logo";
import OverviewIcon from '../assets/images/overview-icon.png'
import RecipeIcon from '../assets/images/recipe-icon.png'
import FavoriteIcon from '../assets/images/favorite-icon.png'
import SubscribedIcon from '../assets/images/subscribed.png'
import AddRecipe from '../assets/images/add-recipe-img.png'
import Close from '../assets/images/close.png'
import '../assets/styles/components/SideNavbar.css'
import { Link } from "react-router-dom";

export default function SideNavbar(props) {
    function handleNavbarToggle() {
        props.navbar.current.style.animation = 'close 0.5s'
        setTimeout(() => props.navbar.current.style.zIndex = -1, 490)
    }

    function handleActiveTab(num) {
        const activeTab = document.querySelector('.active-tab')
        if (num === -1) {
            activeTab.style.display = 'none'
            activeTab.style.transform = `translateY(0px)`
        } else {
            activeTab.style.display = 'initial'
            activeTab.style.transform = `translateY(${num}px)`
        }
        activeTab.style.transition = `transform 0.3s`
        if (props.navbar.current.style.animation === 'open 0.5s')
            handleNavbarToggle()
    }

    return (
        <div className="" style={{ height: '93vh' }}>
            <div className="p-0 mb-4 d-flex justify-content-between align-items-center">
                <div className="d-lg-none d-md-none d-inline" onClick={handleNavbarToggle}>
                    <img src={Close} alt="" width={20} />
                </div>
            </div>
            <Logo size={1.7} />
            <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-column mt-4">
                    <Link to='/' className="my-2 p-3 nav-element" onClick={() => handleActiveTab(0)}>
                        <img src={OverviewIcon} alt="*" width={30} />
                        <span className="ms-3">Overview</span>
                    </Link>
                    <Link to='/recipe' className="my-2 p-3 nav-element" onClick={() => handleActiveTab(78.9)}>
                        <img src={RecipeIcon} alt="*" width={30} />
                        <span className="ms-3">Recipes</span>
                    </Link>
                    <Link to='/favorite' className="my-2 p-3 nav-element" onClick={() => handleActiveTab(156.2)}>
                        <img src={FavoriteIcon} alt="*" width={25} />
                        <span className="ms-3">Favorites</span>
                    </Link>
                    <Link to='/subscribed' className="my-2 p-3 nav-element" onClick={() => handleActiveTab(231.7)}>
                        <img src={SubscribedIcon} alt="*" width={25} />
                        <span className="ms-3">Subscribed</span>
                    </Link>
                    <div className="active-tab my-2"></div>
                </div>
                <div className= "text-center text-light">
                    <img src={AddRecipe} alt="*" width={120} className="add-recipe-img" />
                    <div className="box px-3 py-4 add-recipe">
                        <div className="mb-3">Share your own Recipe with the community</div>
                        <Link to='/add-recipe' className="bg-light px-3 py-2" onClick={() => handleActiveTab(-1)}>Upload Now</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}