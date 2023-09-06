import { useEffect, useState } from "react"
import ActiveTab from "../utils/ActiveTab"
import '../assets/styles/pages/loadAnimation.css'
import { RecipeCard } from "../components/RecipeCard"
import Filter from '../assets/images/filter.png'
import '../assets/styles/pages/Recipe.css'
import { useOutletContext } from "react-router-dom"

export default function Recipes() {
    const [recipies, setRecipies] = useState([])
    const { user, auth, search } = useOutletContext()
    const [filterToggle, setFilterToggle] = useState(false)
    const [filter, setFilter] = useState([])

    // function to handle the filter options 
    function handleFilterOptions() {
        if (!filterToggle) {
            document.getElementById('filter-veg').classList.remove('d-none')
            document.getElementById('filter-veg').classList.add('d-inline')
            document.getElementById('filter-veg').style.animation = 'filter-veg 0.001s ease-in'
            document.getElementById('filter-non-veg').classList.remove('d-none')
            document.getElementById('filter-non-veg').classList.add('d-inline')
            document.getElementById('filter-non-veg').style.animation = 'filter-non-veg 0.15s ease-in'
            document.getElementById('filter-popular').classList.remove('d-none')
            document.getElementById('filter-popular').classList.add('d-inline')
            document.getElementById('filter-popular').style.animation = 'filter-popular 0.25s ease-in'
        } else {
            document.getElementById('filter-veg').classList.remove('d-inline')
            document.getElementById('filter-veg').classList.add('d-none')
            document.getElementById('filter-veg').style.animation = ''
            document.getElementById('filter-non-veg').classList.remove('d-inline')
            document.getElementById('filter-non-veg').classList.add('d-none')
            document.getElementById('filter-non-veg').style.animation = ''
            document.getElementById('filter-popular').classList.remove('d-inline')
            document.getElementById('filter-popular').classList.add('d-none')
            document.getElementById('filter-popular').style.animation = ''
        }
        setFilterToggle(!filterToggle)
    }

    // funtion to handle the filter 
    function handleFilter(fil, color) {
        if (!filter.includes(fil)) {
            setFilter([...filter, fil])
            document.getElementById(`filter-${fil}`).classList.remove(`text-${color}`)
            document.getElementById(`filter-${fil}`).classList.add(`text-light`)
            document.getElementById(`filter-${fil}`).classList.add(`bg-${color}`)
        } else {
            setFilter(filter.filter((ele) => ele !== fil))
            document.getElementById(`filter-${fil}`).classList.add(`text-${color}`)
            document.getElementById(`filter-${fil}`).classList.remove(`text-light`)
            document.getElementById(`filter-${fil}`).classList.remove(`bg-${color}`)
        }
    }

    useEffect(() => {
        try {
            //api to fetch all the recipes details
            fetch('http://localhost:4000/api/recipe/all-recipies', {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((res) => {
                    // funtion to filter recipies according to the search
                    function filterRecipe(recipe) {
                        if (recipe.recipeName.toLowerCase().includes(search.toLowerCase()))
                            return true
                        else
                            return false
                    }

                    // filtering recipies according to the filters given by user
                    res = res.filter((ele) => (
                        filterRecipe(ele) &&
                        (filter.includes('veg') && filter.includes('non-veg') ? true :
                            filter.includes('veg') ? ele.type === 'veg' :
                                filter.includes('non-veg') ? ele.type === 'non-veg' :
                                    true)
                    ))

                    if (filter.includes('popular'))
                        res = res.sort((a, b) => b.likes - a.likes)

                    setRecipies(res)
                })
        } catch {
            console.log('fail to fetch');
        }

        // fucusing the search bar when we load this page 
        document.getElementById('search-bar').focus()
        // this will update the aactive tab in side navbar
        ActiveTab(78.9, 1)
    }, [search, filter])

    return (
        <div className="load-animation my-5">
            <div className="d-flex justify-content-between">
                <h4>Discover  Your Recipes</h4>

                {/* the options to filter */}
                <div className="d-flex">
                    <div className="d-flex align-items-center">
                        <div className="px-3 py-1 border rounded-2 text-success border-success d-none" id="filter-veg" onClick={() => handleFilter('veg', 'success')} style={{ cursor: 'pointer' }}>Veg</div>
                        <div className="mx-3 px-3 py-1 border rounded-2 text-danger border-danger d-none" id="filter-non-veg" onClick={() => handleFilter('non-veg', 'danger')} style={{ cursor: 'pointer' }}>Non-Veg</div>
                        <div className="me-3 px-3 py-1 border rounded-2 text-info border-info d-none" id="filter-popular" onClick={() => handleFilter('popular', 'info')} style={{ cursor: 'pointer' }}>Popular</div>
                    </div>
                    {/* filter button to show the filter option  */}
                    <div className="d-flex align-items-center rounded-pill px-3 filter" onClick={handleFilterOptions} style={{ cursor: 'pointer' }}>
                        <div className="fs-5 me-2">Filter</div>
                        <img src={Filter} alt="..." width={25} height={25} />
                    </div>
                </div>
            </div>
            {/* recipies display section  */}
            <div className="recipe-cards mt-4 container p-0" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '37.5rem' }}>
                <div className="row">
                    {
                        recipies.length ? recipies.map((ele) => {
                            return <RecipeCard key={ele._id} recipe={ele} user={user} auth={auth} />
                        }) :
                            <h3 className="text-center w-100">Sorry, we couldn't find the recipe you're seeking. 😔</h3>
                    }
                </div>
            </div>
        </div>
    )
}