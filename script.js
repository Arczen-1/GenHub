function generateNames() {
    const keywordsInput = document.getElementById('keywords');
    const industrySelect = document.getElementById('industry');
    const namesList = document.getElementById('namesList');
    const generatedNamesDiv = document.getElementById('generatedNames');

    const keywords = keywordsInput.value.split(',').map(keyword => keyword.trim());
    const industry = industrySelect.value;

    if (keywords.length < 2) {
        alert('Please enter at least two keywords.');
        return;
    }

    const combinations = generateBusinessNames(keywords, industry);

    // Clear previous results
    namesList.innerHTML = '';

    // Display generated names with a delay for a more engaging effect
    combinations.forEach((name, index) => {
        setTimeout(() => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            namesList.appendChild(listItem);

            // Show the generated names section
            if (index === combinations.length - 1) {
                showGeneratedNamesSection();
            }
        }, index * 100);
    });
}

function generateBusinessNames(keywords, industry) {
    const combinations = [];

    for (let i = 0; i < keywords.length; i++) {
        for (let j = i + 1; j < keywords.length; j++) {
            const combination = keywords[i] + keywords[j];
            combinations.push(combination);

            // You can also add variations like combining words in reverse order
            const reverseCombination = keywords[j] + keywords[i];
            combinations.push(reverseCombination);
        }
    }

    // Add individual keywords to the list
    combinations.push(...keywords);

    // Append industry-specific suffix
    combinations.forEach((name, index) => {
        combinations[index] = name + industry.charAt(0).toUpperCase() + industry.slice(1);
    });

    // Filter out duplicates and return the result
    return [...new Set(combinations)];
}

function showGeneratedNamesSection() {
    const generatedNamesDiv = document.getElementById('generatedNames');
    generatedNamesDiv.classList.remove('hidden');
}
