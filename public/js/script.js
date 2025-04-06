document.addEventListener('DOMContentLoaded', function() {

    
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

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    })

    addNewBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

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

    // Adding event listeners to the delete buttons
    // Called after loading the table
    async function addEventListeners() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = button.dataset.id;
                deleteDish(id);
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
    
})