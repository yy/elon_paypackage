// Embedded data
const data = [
    { "name": "David Risher", "company": "Lyft", "total": 78000000, "pay_ratio": 519, "median_salary": 150000 },
    { "name": "Adam Foroughi", "company": "AppLovin", "total": 83000000, "pay_ratio": 795, "median_salary": 104000 },
    { "name": "Ariel Emanuel", "company": "Endeavor Group", "total": 84000000, "pay_ratio": 1184, "median_salary": 71000 },
    { "name": "Christopher Winfrey", "company": "Charter Communications", "total": 89000000, "pay_ratio": 1635, "median_salary": 54500 },
    { "name": "Stephen Schwarzman", "company": "Blackstone", "total": 120000000, "pay_ratio": 489, "median_salary": 245000 },
    { "name": "Sue Nabi", "company": "Coty", "total": 149000000, "pay_ratio": 3769, "median_salary": 39500 },
    { "name": "Nikesh Arora", "company": "Palo Alto Networks", "total": 151000000, "pay_ratio": 735, "median_salary": 205000 },
    { "name": "Hock Tan", "company": "Broadcom", "total": 162000000, "pay_ratio": 510, "median_salary": 318000 },
    { "name": "Harvey Schwartz", "company": "The Carlyle Group", "total": 187000000, "pay_ratio": 813, "median_salary": 230000 },
    { "name": "Jon Winkelried", "company": "TPG", "total": 199000000, "pay_ratio": 683, "median_salary": 291000 },
    { "name": "Elon Musk", "company": "Tesla", "total": 56000000000, "pay_ratio": 491104, "median_salary": 114033 }
];

// Reference to the container divs
const otherCEOsContainer = d3.select('#other-ceos');
const elonMuskContainer = d3.select('#elon-musk');

// Function to add million dollar lines and labels
function addMillionLines(svg, height) {
    for (let i = 1; i <= Math.floor(height / 100); i++) {
        svg.append('line')
            .attr('x1', 0)
            .attr('x2', 100)
            .attr('y1', i * 100)
            .attr('y2', i * 100)
            .attr('stroke', 'black')
            .attr('stroke-dasharray', '5,5');

        svg.append('text')
            .attr('x', 105)
            .attr('y', i * 100)
            .attr('dy', '-0.4em')
            .text(`${i}M`);
    }
}

// Loop through data and create SVGs for each entry
data.forEach(d => {
    const totalHeight = d.total / 10000;

    // Decide which container to append to
    const container = d.name === 'Elon Musk' ? elonMuskContainer : otherCEOsContainer;
    const boxcolor = d.name === 'Elon Musk' ? '#E31937' : 'orange';

    // Append an h2 element for the CEO name and company
    container.append('h2').text(`${d.name} (${d.company}, $${d.total / 1000000}M)`);

    // Append SVG for total CEO pay
    const totalSvg = container.append('svg')
        .attr('width', 170)
        .attr('height', totalHeight)
        .style('display', 'block')
        .style('margin', '10px auto')
        .style('background-color', boxcolor);

    totalSvg.append('rect')
        .attr('width', 100)
        .attr('height', totalHeight)
        .attr('fill', boxcolor);

    // Append million dollar lines for total pay
    addMillionLines(totalSvg, totalHeight);
});

// Add this part to your existing JavaScript
window.addEventListener('scroll', function () {
    const floatingText = document.getElementById('floating-text');
    const triggerPoints = [
        600, 10000, 30000, 50000, 56251, 84000, 100920, 131128, 139915, 1365447, 1405447, 
        1595943, 1816029, 2317440, 2800178, 2878035, 5599600,
    ];

    const floatingTextContent = [
        "Let's go through top 10 CEOs.",
        "Keep scrolling",
        "We're just starting...",
        "It's still less than 1% of Elon Musk's pay package.", 
        "Elon Musk's pay package is $56B.",
        "Still not even 1 billion yet.",
        "Finally 1B! We need to scroll more than 50 times of what we have to reach Elon Musk's pay package.",
        "Uh oh. We've exhausted all top 10 crazy pay packages for CEOs. But it's only 1.3B. This is also slightly more than how much the whole company made in the last quarter (net income).",
        "Keep scrolling! There will be something around $13.6B. Can you reach there?",
        "This is about how much Tesla made (net income) in the past year ($13.65B)! Someone who is good at the economy please help Tesla... Still not there yet. ", 
        "Just keep scrolling...",
        "Look at the scoll bar on your browser... 😂", 
        "Is it even moving?",
        "Not even half way there yet...",
        "About half way there...",
        "Did you know that you'll NOT have 50 Billion dollars even if you receive $50,000 PER DAY since the birth of Jesus Christ (for more than 2,000 years)?",
        "Wow! You have done it! You've scrolled past Elon Musk's pay package! 🎉🎉🎉"
    ];

    // Loop through trigger points and update the floating text
    for (let i = 0; i < triggerPoints.length; i++) {
        if (window.scrollY >= triggerPoints[i]) {
            floatingText.style.display = 'block'; // Ensure the floating text is displayed
            //floatingText.textContent = `You've scrolled past $${triggerPoints[i] / 1000000}M`;
            floatingText.textContent = `${floatingTextContent[i]}`;
        } 
        if (window.scrollY < triggerPoints[0]) {
            floatingText.style.display = 'none'; // Ensure the floating text is displayed
        }
    }
});