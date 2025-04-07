document.addEventListener('DOMContentLoaded', function() {
    let currentDishId = null;

    // Run the main function to load dishes
    main();

    // Main function that calls the fetch and display functions
    async function main() {
        const allDishes = await fetchAllDishes();
        displayDishes(allDishes);
    }

    const closeModalBtn = document.getElementById('close-btn');
    const modal = document.getElementById('modal');
    const addNewBtn = document.getElementById('add-new-button');
    const dishForm = document.getElementById('dish-form');
    

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    })

    addNewBtn.addEventListener('click', () => {
        dishForm.reset();
        currentDishId = null;
        modal.classList.remove('hidden');
        
    });

    dishForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitForm();
    })


    // === Functions ===
    // The fetch function that fetches all dishes from the database
    // Returns an array with all dishes
    async function fetchAllDishes() {
        try {
            const response = await fetch('/api/dishes');
            const allDishes = await response.json();

            console.log('Dishes:', allDishes);
            return allDishes;
        } catch (error) {
            console.error('Error fetching dishes:', error);
            
        }
    }

    // Function that renders all dishes onto the table in index.html
    function displayDishes(dishes) {
        const tbody = document.getElementById("dish-table-body");
        const fragment = document.createDocumentFragment();

        try {
            dishes.forEach(dish => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td class="dish-name">${capitalize(dish.name)}</td>
                    <td class="ingredients">${dish.ingredients.join(', ')}</td>
                    <td>${dish.preparationSteps.join(', ')}</td>
                    <td>${dish.cookingTime} min</td>
                    <td>${capitalize(dish.origin)}</td>
                    <td>${dish.isVegetarian ? "Yes" : "No"}</td>
                    <td>
                        <button data-id="${dish._id}" class="delete-btn">Delete</button>
                        <button data-id="${dish._id}" class="modify-btn">Modify</button>
                    </td>
                `;

                fragment.appendChild(row);
            });

            tbody.innerHTML = "";
            tbody.appendChild(fragment);

            addEventListeners();
        } catch (error) {
            const errorRow = document.createElement('tr');
            const errorCell = document.createElement('td');
            errorCell.colSpan = 7;
            errorCell.textContent = 'Failed to load dishes. Please try again later.';
            errorCell.style.color = 'red';
            errorRow.appendChild(errorCell);
            tbody.appendChild(errorRow);
        }
    }

    // Simple capitalize function
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Adding event listeners to the buttons
    // Called after loading the table
    async function addEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                deleteDish(id);
            })
        })

        const modifyButtons = document.querySelectorAll('.modify-btn');
        modifyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                handleModify(id);
            })
        })
    }

    // The functionality for delete buttons
    async function deleteDish(id) {
        const confirmDelete = confirm("Are you sure you want to delete this dish?")
        if (!confirmDelete) return;
        
        try {
            const response = await fetch(`/api/dishes/${id}`, { method: 'DELETE' });

            if (!response.ok) {
                throw new Error('Failed to delete dish')
            }

            console.log(`Deleted dish with id: ${id}`);

            const updatedDished = await fetchAllDishes();
            displayDishes(updatedDished);
            
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    }

    // The functionality for the modify buttons
    // Calling on the PUT function in the API
    async function handleModify(id) {
        try {
            // Display modal
            modal.classList.remove('hidden');

            // Get input fields
            const nameInput = document.getElementById('name');
            const ingredientsInput = document.getElementById('ingredients');
            const preparationInput = document.getElementById('preparation-steps');
            const cookingTimeInput = document.getElementById('cooking-time');
            const originInput = document.getElementById('origin');
            const isVegetarianInput = document.getElementById('is-vegetarian');

            // Fetch current dish
            const response = await fetch(`api/dishes/id/${id}`);
            const dish = await response.json();

            // Fill in the current values
            nameInput.value = dish.name;
            ingredientsInput.value = dish.ingredients.join(', ');
            preparationInput.value = dish.preparationSteps.join(', ');
            cookingTimeInput.value = dish.cookingTime;
            originInput.value = dish.origin;
            isVegetarianInput.checked = dish.isVegetarian;

            currentDishId = id; // Set the current dish ID for later use

        } catch (error) {
            console.error('Errir updating dish', error);
        }
    }
    
    // The function that handles the form submission
    // Checks if the dish is new or existing
    // and calls the appropriate API function
    async function submitForm() {
        const name = document.getElementById('name').value.trim();
        const ingredients = document.getElementById('ingredients').value.split(',').map(i => i.trim());
        const preparationSteps = document.getElementById('preparation-steps').value.split(',').map(s => s.trim());
        const cookingTime = parseInt(document.getElementById('cooking-time').value);
        const origin = document.getElementById('origin').value.trim();
        const isVegetarian = document.getElementById('is-vegetarian').checked;

        const dishData = {
            name,
            ingredients,
            preparationSteps,
            cookingTime,
            origin,
            isVegetarian
        };

        try {
            // IF modify existing dish
            if (currentDishId) {
                await fetch(`/api/dishes/${currentDishId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dishData)
                });
            } else {
                // IF new dish
                await fetch('/api/dishes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dishData)
                });
            }

            // Hide modal and update the table
            modal.classList.add('hidden');
            const updatedDished = await fetchAllDishes();
            displayDishes(updatedDished);
        } catch (error) {
            console.error('Error saving dish:', error);
        }
    }
})