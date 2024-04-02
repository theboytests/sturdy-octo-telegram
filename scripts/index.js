import { recipes } from '../data/recipes.js';
// initializing dropdown lists
let currentIngredientsList = [];
let currentAppliancesList = [];
let currentUstensilsList = [];
let currentRecipesList = recipes;
let searchBarValue = "";

//declaring variables
const mainContainer = document.querySelector('main');
const numberRecipes = document.getElementById('numberRecipes');
const searchBarInput = document.getElementById("searchBar");

const recipesContainer = document.createElement('div');
recipesContainer.className = 'recipesContainer';

const searchBarButton = document.getElementById("searchBarButton");
const dropdownButtons = document.querySelectorAll('.dropbtn');
const searchContainer = document.querySelector(".searchContainer");
const dropdownTagContainer = document.createElement("div");
dropdownTagContainer.className = "dropdownTagContainer";

const listIngredientsContainer = document.getElementById("ingredients-list");
const listAppliancesContainer = document.getElementById("appliances-list");
const listUstensilsContainer = document.getElementById("ustensils-list");



// functions
function displayRecipes(recipesList) {
    recipesContainer.innerText = ""; // empty the container for shown recipes
    // creating a visual for each result
    for (let i = 0; i < recipesList.length; i++) {
        createRecipeCard(recipesList[i]);
    };
};

function displayNumberRecipes(recipesList) {
    if (recipesList === null) {
        numberRecipes.innerText = "1500 recettes";
    } else if (recipesList.length === 0) {
        numberRecipes.innerText = "Il n'y a pas de recette correspondante à votre demande.";
    } else if (recipesList.length === 1) {
        numberRecipes.innerText = recipesList.length + " recette";
    } else {
        numberRecipes.innerText = recipesList.length + " recettes";
    }
};

function displayDropListItems(itemList, container) {
    container.innerText = "";
    for (let i = 0; i < itemList.length; i++) {
        const dropItem = document.createElement('li');
        const firstCharItemUppercase = itemList[i].charAt(0).toUpperCase() + itemList[i].slice(1);
        dropItem.innerText = firstCharItemUppercase;
        container.appendChild(dropItem);
    };
};

function createRecipeCard(recipe) {
    const recipeCard = document.createElement('article');
    recipeCard.className = 'recipeCard';
    const recipeImage = document.createElement('img');
    recipeImage.src = 'assets/recipes/' + recipe.image;
    recipeImage.alt = recipe.name;
    recipeImage.className = 'recipeImage';
    const recipeTime = document.createElement('div');
    recipeTime.className = 'recipeTime';
    recipeTime.innerText = recipe.time + "min";
    const recipeName = document.createElement('h3');
    recipeName.className = 'recipeName';
    recipeName.innerText = recipe.name;
    const recipeContent = document.createElement('div');
    recipeContent.className = 'recipeContent';
    const recipeContentDescription = document.createElement('div');
    recipeContentDescription.className = 'recipeContentDescription';
    const recipeTitleDescription = document.createElement("h4");
    recipeTitleDescription.className = "recipeTitle";
    recipeTitleDescription.innerText = "RECETTE";
    const recipeDescription = document.createElement("p");
    recipeDescription.className = "recipeDescription";
    recipeDescription.innerText = recipe.description;
    const recipeContentIngredients = document.createElement('div');
    recipeContentIngredients.className = 'recipeContentIngredients';
    const recipeTitleIngredients = document.createElement("h4");
    recipeTitleIngredients.className = "recipeTitle";
    recipeTitleIngredients.innerText = "INGRéDIENTS";
    const listIngredients = document.createElement('ul');
    listIngredients.className = 'listIngredients';

    // creating a list of ingredients
    for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredientRecipe = recipe.ingredients[i];
        const ingredient = document.createElement("li");
        ingredient.className = "ingredient";
        let ingredientQuantityInfo = "";

        if (ingredientRecipe.unit) {
            ingredientQuantityInfo = (ingredientRecipe.quantity + " " + ingredientRecipe.unit);
        } else if (!ingredientRecipe.quantity) {
            ingredientQuantityInfo = ("-");
        } else {
            ingredientQuantityInfo = (ingredientRecipe.quantity);
        }
        ingredient.innerHTML = '<span class="ingredientName">' + ingredientRecipe.ingredient + '</span><br><span class="ingredientQuantity">' + ingredientQuantityInfo + '</span>';

        listIngredients.appendChild(ingredient);

        // display this visual
        mainContainer.appendChild(recipesContainer);
        recipesContainer.appendChild(recipeCard);
        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeTime);
        recipeCard.appendChild(recipeName);
        recipeCard.appendChild(recipeContent);
        recipeContent.appendChild(recipeContentDescription);
        recipeContentDescription.appendChild(recipeTitleDescription);
        recipeContentDescription.appendChild(recipeDescription);
        recipeContent.appendChild(recipeContentIngredients);
        recipeContentIngredients.appendChild(recipeTitleIngredients);
        recipeContentIngredients.appendChild(listIngredients);
    };
};

function createItemsLists(currentRecipesList) {
    currentIngredientsList = [];
    currentAppliancesList = [];
    currentUstensilsList = [];
    for (let i = 0; i < currentRecipesList.length; i++) {
        const currentRecipe = currentRecipesList[i];

        // refresh all the elements in the recipes searched
        for (let j = 0; j < currentRecipe.ingredients.length; j++) {
            const ingredientRecipe = currentRecipe.ingredients[j];
            currentIngredientsList.push(ingredientRecipe.ingredient);
        };

        currentAppliancesList.push(currentRecipe.appliance);

        for (let k = 0; k < currentRecipe.ustensils.length; k++) {
            const ustensilRecipe = currentRecipe.ustensils[k];
            currentUstensilsList.push(ustensilRecipe);
        };
    };
};

function sortListItems(currentListItems) {
    // delete the clones
    let uniqueItems = [];
    for (let i = 0; i < currentListItems.length; i++) {
        const currentListItem = currentListItems[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!uniqueItems.includes(currentListItem)) {
            uniqueItems.push(currentListItem);
        };
    };

    // sorting
    for (let i = 0; i < uniqueItems.length - 1; i++) {
        for (let j = i + 1; j < uniqueItems.length; j++) {
            if (uniqueItems[i] > uniqueItems[j]) {
                // Échange les éléments s'ils ne sont pas dans l'ordre
                const temp = uniqueItems[i];
                uniqueItems[i] = uniqueItems[j];
                uniqueItems[j] = temp;
            };
        };
    };

    return uniqueItems;
};


function createTag(button) {
    //creation of the tag
    const dropListButtonSelected = document.createElement("button");
    dropListButtonSelected.type = "button";
    dropListButtonSelected.className = "dropListButtonSelected";
    const dropListButtonSelectedImage = document.createElement("img");
    dropListButtonSelectedImage.className = "closeTag";
    dropListButtonSelectedImage.src = "assets/icons/closeButton.svg";
    dropListButtonSelectedImage.alt = "Close Tag";
    dropListButtonSelected.innerText = button.innerText;
    // display of the tag
    searchContainer.appendChild(dropdownTagContainer);
    dropdownTagContainer.appendChild(dropListButtonSelected);
    dropListButtonSelected.appendChild(dropListButtonSelectedImage);
};

function updateItemsList(itemsListUl, currentItemsList) {
    const allItems = itemsListUl.querySelectorAll("li");

    for (let i = 0; i < allItems.length; i++) {
        const displayItem = allItems[i];
        const itemInDisplayItemsList = currentItemsList.some(item => item === displayItem.innerText.toLowerCase());

        if (!itemInDisplayItemsList) {
            displayItem.remove();
        };
    };
};

function tagUpdateRecipeList() {
    const tagValueAll = document.querySelectorAll(".dropListButtonSelected");
    const filteredRecipes = [];

    for (let i = 0; i < tagValueAll.length; i++) {
        const tagValue = tagValueAll[i];
        const tagValueText = tagValue.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        for (let j = 0; j < currentRecipesList.length; j++) {
            const recipe = currentRecipesList[j];

            const hasMatchingIngredient = recipe.ingredients.some(ingredient => {
                const normalizedIngredient = ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return normalizedIngredient === tagValueText;
            });

            const hasMatchingAppliance = recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === tagValueText;

            const hasMatchingUstensil = recipe.ustensils.some(ustensil => {
                const normalizedUstensil = ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return normalizedUstensil === tagValueText;
            });

            if (hasMatchingIngredient || hasMatchingAppliance || hasMatchingUstensil) {
                filteredRecipes.push(recipe);
            };
        };
    };
    currentRecipesList = filteredRecipes;
};



displayRecipes(currentRecipesList);
displayNumberRecipes(null);
createItemsLists(currentRecipesList);
currentIngredientsList = sortListItems(currentIngredientsList);
currentAppliancesList = sortListItems(currentAppliancesList);
currentUstensilsList = sortListItems(currentUstensilsList);
displayDropListItems(currentIngredientsList, listIngredientsContainer);
displayDropListItems(currentAppliancesList, listAppliancesContainer);
displayDropListItems(currentUstensilsList, listUstensilsContainer);



// event listeners
searchBarButton.addEventListener("click", () => {
    searchBarValue = searchBarInput.value;
    const normalizedInput = searchBarValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (normalizedInput.length >= 3 && /^[a-zA-Z\s]*$/.test(normalizedInput)) {
        const filteredRecipes = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const recipeTitle = recipe.name.toLowerCase();
            const recipeDesc = recipe.description.toLowerCase();
            let recipeIngr = false;

            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j];
                ingredient.ingredient.toLowerCase();

                if (ingredient.ingredient.toLowerCase().includes(normalizedInput.toLowerCase())) {
                    recipeIngr = true;
                    break;
                }
            }

            if (recipeTitle.includes(normalizedInput.toLowerCase()) || recipeDesc.includes(normalizedInput.toLowerCase()) || recipeIngr) {
                filteredRecipes.push(recipe);
            }
        }

        currentRecipesList = filteredRecipes;

        if (currentRecipesList.length === 0) {
            numberRecipes.innerText = "Aucune recette ne contient '" + searchBarValue + "'. Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.";
        } else {
            displayRecipes(currentRecipesList);
            displayNumberRecipes(currentRecipesList);
            createItemsLists(currentRecipesList);
            currentIngredientsList = sortListItems(currentIngredientsList);
            currentAppliancesList = sortListItems(currentAppliancesList);
            currentUstensilsList = sortListItems(currentUstensilsList);
            updateItemsList(listIngredientsContainer, currentIngredientsList);
            updateItemsList(listAppliancesContainer, currentAppliancesList);
            updateItemsList(listUstensilsContainer, currentUstensilsList);
        }
    } else {
        currentRecipesList = recipes;
        displayRecipes(currentRecipesList);
        displayNumberRecipes(null);
        createItemsLists(recipes);
        currentIngredientsList = sortListItems(currentIngredientsList);
        currentAppliancesList = sortListItems(currentAppliancesList);
        currentUstensilsList = sortListItems(currentUstensilsList);
        displayDropListItems(currentIngredientsList, listIngredientsContainer);
        displayDropListItems(currentAppliancesList, listAppliancesContainer);
        displayDropListItems(currentUstensilsList, listUstensilsContainer);
    }
});

for (let i = 0; i < dropdownButtons.length; i++) {
    const button = dropdownButtons[i];
    button.addEventListener("click", () => {
        const siblingElement = button.nextElementSibling;
        if (siblingElement) {
            siblingElement.classList.toggle("show");
            button.classList.toggle("show");
        };
    });
};

document.addEventListener("click", function (event) {
    if ((event.target.classList.contains('closeTag')) || (event.target.classList.contains('validate'))) {
        if (event.target.classList.contains('validate')) {
            event.target.classList.remove("validate");
            const allTags = document.querySelectorAll(".closeTag");

            for (let i = 0; i < allTags.length; i++) {
                const tag = allTags[i];
                if (event.target.innerText.toLowerCase() === tag.parentElement.innerText.toLowerCase()) {
                    tag.parentElement.remove();
                }
            }

            const spanElement = event.target.querySelector("span");
            event.target.removeChild(spanElement);
        } else {
            // delete the container
            event.target.parentElement.remove();

            // remove the class that corresponds to the closed tag
            const dropdownContainers = document.querySelectorAll(".dropdown-content ul");

            for (let i = 0; i < dropdownContainers.length; i++) {
                const container = dropdownContainers[i];
                const selectDropListButtons = container.querySelectorAll("li");

                for (let j = 0; j < selectDropListButtons.length; j++) {
                    const button = selectDropListButtons[j];
                    if (event.target.parentElement.innerText.toLowerCase() === button.innerText.toLowerCase()) {
                        button.classList.remove("validate");
                    }
                }
            }
        }

        if (searchBarValue) {
            const normalizedInput = searchBarValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if ((document.querySelectorAll('.closeTag').length > 0)) {
                currentRecipesList = [];

                for (let i = 0; i < recipes.length; i++) {
                    const recipe = recipes[i];
                    const recipeTitle = recipe.name.toLowerCase();
                    const recipeDesc = recipe.description.toLowerCase();
                    let recipeIngr = false;

                    for (let j = 0; j < recipe.ingredients.length; j++) {
                        const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                        if (ingredient.includes(normalizedInput)) {
                            recipeIngr = true;
                            break;
                        }
                    }

                    if (recipeTitle.includes(normalizedInput) || recipeDesc.includes(normalizedInput) || recipeIngr) {
                        currentRecipesList.push(recipe);
                    }
                }

                // searchBar recipes function
                tagUpdateRecipeList();
                displayRecipes(currentRecipesList);
                displayNumberRecipes(currentRecipesList);
                createItemsLists(currentRecipesList);
                currentIngredientsList = sortListItems(currentIngredientsList);
                currentAppliancesList = sortListItems(currentAppliancesList);
                currentUstensilsList = sortListItems(currentUstensilsList);
                updateItemsList(listIngredientsContainer, currentIngredientsList);
                updateItemsList(listAppliancesContainer, currentAppliancesList);
                updateItemsList(listUstensilsContainer, currentUstensilsList);
            } else {
                currentRecipesList = [];

                for (let i = 0; i < recipes.length; i++) {
                    const recipe = recipes[i];
                    const recipeTitle = recipe.name.toLowerCase();
                    const recipeDesc = recipe.description.toLowerCase();
                    let recipeIngr = false;

                    for (let j = 0; j < recipe.ingredients.length; j++) {
                        const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                        if (ingredient.includes(normalizedInput)) {
                            recipeIngr = true;
                            break;
                        }
                    }

                    if (recipeTitle.includes(normalizedInput) || recipeDesc.includes(normalizedInput) || recipeIngr) {
                        currentRecipesList.push(recipe);
                    }
                }

                // searchBar function
                displayRecipes(currentRecipesList);
                displayNumberRecipes(currentRecipesList);
                createItemsLists(currentRecipesList);
                currentIngredientsList = sortListItems(currentIngredientsList);
                currentAppliancesList = sortListItems(currentAppliancesList);
                currentUstensilsList = sortListItems(currentUstensilsList);
                updateItemsList(listIngredientsContainer, currentIngredientsList);
                updateItemsList(listAppliancesContainer, currentAppliancesList);
                updateItemsList(listUstensilsContainer, currentUstensilsList);
            }
        } else {
            if ((document.querySelectorAll('.closeTag').length > 0)) {
                tagUpdateRecipeList();
                displayRecipes(currentRecipesList);
                displayNumberRecipes(currentRecipesList);
                createItemsLists(currentRecipesList);
                currentIngredientsList = sortListItems(currentIngredientsList);
                currentAppliancesList = sortListItems(currentAppliancesList);
                currentUstensilsList = sortListItems(currentUstensilsList);
                updateItemsList(listIngredientsContainer, currentIngredientsList);
                updateItemsList(listAppliancesContainer, currentAppliancesList);
                updateItemsList(listUstensilsContainer, currentUstensilsList);
            } else {
                currentRecipesList = recipes;
                displayRecipes(currentRecipesList);
                displayNumberRecipes(null);
                createItemsLists(recipes);
                currentIngredientsList = sortListItems(currentIngredientsList);
                currentAppliancesList = sortListItems(currentAppliancesList);
                currentUstensilsList = sortListItems(currentUstensilsList);
                displayDropListItems(currentIngredientsList, listIngredientsContainer);
                displayDropListItems(currentAppliancesList, listAppliancesContainer);
                displayDropListItems(currentUstensilsList, listUstensilsContainer);
            }
        }
    } else if (event.target.tagName === 'LI' && event.target.closest('.dropdown-content ul')) {
        if (!searchBarValue) {
            /* currentRecipesList = recipes;*/
        };
        // display none the div that contains the list
        const parentElement = event.target.parentNode.parentNode;
        parentElement.classList.toggle("show");

        // search for the tags in the list 
        if (event.target.parentNode === listIngredientsContainer) {
            const filteredRecipes = [];
            const targetText = event.target.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            for (let i = 0; i < currentRecipesList.length; i++) {
                const recipe = currentRecipesList[i];
                const hasMatchingIngredient = recipe.ingredients.some(ingredient => {
                    const normalizedIngredient = ingredient.ingredient.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normalizedIngredient === targetText;
                });

                if (hasMatchingIngredient) {
                    filteredRecipes.push(recipe);
                };
            };

            currentRecipesList = filteredRecipes;
        } else if (event.target.parentNode === listAppliancesContainer) {
            const filteredRecipes = [];
            const targetText = event.target.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            for (let i = 0; i < currentRecipesList.length; i++) {
                const recipe = currentRecipesList[i];
                const hasMatchingAppliance = recipe.appliance.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === targetText;

                if (hasMatchingAppliance) {
                    filteredRecipes.push(recipe);
                };
            };

            currentRecipesList = filteredRecipes;
        } else if (event.target.parentNode === listUstensilsContainer) {
            const filteredRecipes = [];
            const targetText = event.target.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            for (let i = 0; i < currentRecipesList.length; i++) {
                const recipe = currentRecipesList[i];
                const hasMatchingUstensil = recipe.ustensils.some(ustensil => {
                    const normalizedUstensil = ustensil.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normalizedUstensil === targetText;
                });

                if (hasMatchingUstensil) {
                    filteredRecipes.push(recipe);
                };
            };

            currentRecipesList = filteredRecipes;
        }


        displayRecipes(currentRecipesList);
        createItemsLists(currentRecipesList);
        currentIngredientsList = sortListItems(currentIngredientsList);
        currentAppliancesList = sortListItems(currentAppliancesList);
        currentUstensilsList = sortListItems(currentUstensilsList);
        displayNumberRecipes(currentRecipesList);
        createTag(event.target);
        event.target.classList.add("validate");
        event.target.innerHTML += '<span><img class="closeLi" src="assets/icons/closeLi.svg" alt="close LI"></span>';
        updateItemsList(listIngredientsContainer, currentIngredientsList);
        updateItemsList(listAppliancesContainer, currentAppliancesList);
        updateItemsList(listUstensilsContainer, currentUstensilsList);
    }
});

const divDropContainer = document.querySelectorAll(".dropdownDivContainer");

for (let i = 0; i < divDropContainer.length; i++) {
    const div = divDropContainer[i];

    div.addEventListener("mouseout", function (event) {
        const targetElement = event.relatedTarget;
        const dropdownContent = this.querySelector('.dropdown-content');

        if (!this.contains(targetElement)) {
            dropdownContent.classList.toggle("show", false);
        };
    });
};

function filterAndDisplayDropList(searchElement, currentList, listContainer) {
    const inputValue = document.getElementById(searchElement).value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const eraseSearchbarItem = document.querySelector(".eraseSearchbarItem");
    if (inputValue.length >= 3 && /^[a-zA-Z\s]*$/.test(inputValue)) {
        const filteredList = [];
        eraseSearchbarItem.style.display = ("block");
        for (let i = 0; i < currentList.length; i++) {
            const normalizedCurrent = currentList[i].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if (normalizedCurrent.includes(inputValue)) {
                filteredList.push(currentList[i]);
            }
        }

        displayDropListItems(filteredList, listContainer);
    }
}

document.getElementById("searchIngredients").addEventListener("input", () => {
    filterAndDisplayDropList("searchIngredients", currentIngredientsList, listIngredientsContainer);
});

document.getElementById("searchAppliances").addEventListener("input", () => {
    filterAndDisplayDropList("searchAppliances", currentAppliancesList, listAppliancesContainer);
});

document.getElementById("searchUstensils").addEventListener("input", () => {
    filterAndDisplayDropList("searchUstensils", currentUstensilsList, listUstensilsContainer);
});

searchBarInput.addEventListener("input", () => {
    searchBarValue = searchBarInput.value;
    const eraseSearchbar = document.querySelector(".eraseSearchbar");
    if (searchBarValue.length >= 3) {
        eraseSearchbar.style.display = ("block");
    } else {
        eraseSearchbar.style.display = ("none");
    };
});