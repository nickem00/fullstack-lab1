document.addEventListener('DOMContentLoaded', function() {
    main();

    async function main() {
        const allDishes = await fetchAllDishes();
        displayDishes(allDishes);
    }

    // === Functions ===
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

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
})