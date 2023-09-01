import { Link } from "react-router-dom";
import '../assets/styles/components/RecipeCard.css'
import { useEffect, useState } from "react";
import Favorite from '../assets/images/favorite-icon.png'
import Liked from '../assets/images/liked.png'
import HandleUpdateRecipe from '../utils/HandleUpdateRecipe'

export const RecipeCard = (props) => {
    const [recipeUploader, setRecipeUploader] = useState([])
    const [updatedRecipe, setUpdatedRecipe] = useState(props.recipe)

    async function handleLike() {
        if (props.auth) {
            const likedUsers = JSON.parse(updatedRecipe.likedUsers)

            let formData = new FormData()

            formData.append('userId', updatedRecipe.userId)
            formData.append('recipeName', updatedRecipe.recipeName)
            formData.append('ingredient', updatedRecipe.ingredient)
            formData.append('instructions', updatedRecipe.instructions)
            formData.append('category', updatedRecipe.category)
            formData.append('type', updatedRecipe.type)
            formData.append('serves', updatedRecipe.serves)
            formData.append('recipe-image', updatedRecipe.image)

            if (!likedUsers.includes(props.user._id)) {
                document.getElementById(updatedRecipe._id).src = Liked
                formData.append('likes', updatedRecipe.likes + 1)
                formData.append('likedUsers', JSON.stringify([...likedUsers, props.user._id]))
            } else {
                document.getElementById(updatedRecipe._id).src = Favorite
                formData.append('likes', updatedRecipe.likes - 1)
                const users = likedUsers.filter((ele) => (ele !== props.user._id))
                formData.append('likedUsers', JSON.stringify([...users]))
            }

            const res = await HandleUpdateRecipe(updatedRecipe, formData)
            setUpdatedRecipe(res)
        } else {
            window.location.href = '/login'
        }
    }

    const likes = updatedRecipe.likes > 1000000000 ? `${(updatedRecipe.likes / 1000000000).toFixed(2)}b` :
        updatedRecipe.likes > 1000000 ? `${(updatedRecipe.likes / 1000000).toFixed(2)}m` :
            updatedRecipe.likes > 1000 ? `${(updatedRecipe.likes / 1000).toFixed(2)}k` : `${updatedRecipe.likes}`

    const uploadTime = new Date(
        updatedRecipe.createdAt.slice(0, 4),
        updatedRecipe.createdAt.slice(5, 7) - 1,
        updatedRecipe.createdAt.slice(8, 10),
        updatedRecipe.createdAt.slice(11, 13),
        updatedRecipe.createdAt.slice(14, 16),
        updatedRecipe.createdAt.slice(17, 19),
    )
    const presentTime = new Date()
    const timeInMili = presentTime - uploadTime

    const time = timeInMili > 31556926000 ? `${parseInt(timeInMili / 31556926000)} year ago` :
        timeInMili > 2629746000 ? `${parseInt(timeInMili / 2629746000)} month ago` :
            timeInMili > 86400000 ? `${parseInt(timeInMili / 86400000)} day ago` :
                timeInMili > 3600000 ? `${parseInt(timeInMili / 3600000)} hour ago` :
                    timeInMili > 60000 ? `${parseInt(timeInMili / 60000)} minute ago` :
                        `${parseInt(timeInMili / 60000)} seconds ago`

    useEffect(() => {
        try {
            fetch('http://localhost:4000/api/recipe/recipe-uploader/' + updatedRecipe.userId, {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((json) => {
                    setRecipeUploader(json['user'])
                })
        } catch {
            console.log('fail to fetch');
        }
    }, [updatedRecipe])

    return (
        // <div className={"card " + props.className}>
        <div className="card p-0 mx-3 mb-5 mt-0">
            <img src={"http://localhost:4000/" + updatedRecipe.image} className="card-img-top" alt="..." height={150} />
            <div className="card-body">
                <div className="p-0 d-flex justify-content-between">
                    <div>
                        <h4 className="card-title mb-1">{updatedRecipe.recipeName.charAt(0).toUpperCase() + updatedRecipe.recipeName.slice(1)}</h4>
                        <div className="d-flex align-items-center">
                            <div className="text-muted" style={{ fontSize: '0.8em' }}>by 
                                <Link to={'/profile/' + updatedRecipe.userId} className="text-muted"> {recipeUploader.name}</Link>
                            </div>
                            <div className="px-2">•</div>
                            <div className="text-muted" style={{ fontSize: '0.8em' }}>{updatedRecipe.type}</div>
                        </div>
                    </div>
                    <div onClick={handleLike}>
                        <img src={props.user ? JSON.parse(updatedRecipe.likedUsers).includes(props.user._id) ? Liked : Favorite : Favorite} alt="" width={30} height={30} id={updatedRecipe._id} />
                        <div className="text-center" style={{ fontSize: '0.8em' }}>{likes}</div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <Link to={`/recipe-details/${updatedRecipe._id}/${recipeUploader.name}`} className="btn btn-primary border-0" style={{ background: '#fa9200' }}>Details</Link>
                    <div style={{ fontSize: '0.9em' }}>{time}</div>
                </div>
            </div>
        </div>
    );
};