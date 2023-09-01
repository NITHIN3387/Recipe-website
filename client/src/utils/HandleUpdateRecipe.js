export default async function HandleUpdateRecipe(recipe, data) {
    let updatedRecipe

    try {
        await fetch('http://localhost:4000/api/recipe/update-recipe/' + recipe._id, {
            method: 'PUT',
            body: data
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.status)
                    window.location.href = '/login'
                else {
                    updatedRecipe = res.recipe
                }
            })
    } catch {
        console.log('fail to fetch');
    }
    
    return updatedRecipe
}  