import { RecipeCard } from "./RecipeCard";
import { Link } from 'react-router-dom'
import More from '../assets/images/view-more.png'
import { useEffect, useState } from "react";
import '../assets/styles/components/SuggestionSection.css'


export const SuggestionSection = (props) => {
    const [recipies, setRecipies] = useState([])

    useEffect(() => {
        try {
            fetch('http://localhost:4000/api/recipe/all-recipies', {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((res) => {
                    setRecipies(res)
                })
        } catch {
            console.log('fail to fetch');
        }
    }, [])

    if (recipies.length) {
        return (
            <div>
                <div className="mt-5 mb-4 row">
                    <h4 className="col-lg-10 col-7">{props.title}</h4>
                    <Link to='/recipe' className="col-lg-2 col-5 text-end">
                        <span className="me-2" style={{ color: '#fa9200' }}>View more</span>
                        <img src={More} alt="" width={20} />
                    </Link>
                </div>
                <div className="container p-0 d-flex" style={{overflowX: 'auto'}}>
                    {
                        recipies.sort((a, b) => b.likes - a.likes).slice(0, 4).map((ele) => (
                            <RecipeCard recipe={ele} user={props.user} key={ele._id} auth={props.auth} />
                        ))
                    }
                </div>
            </div>
        );
    }
};