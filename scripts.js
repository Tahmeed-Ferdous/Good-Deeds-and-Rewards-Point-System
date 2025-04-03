
// Retrieve data from localStorage or set default values.
let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
let logs = JSON.parse(localStorage.getItem('logs')) || [];
let items = JSON.parse(localStorage.getItem('items')) || [
  { name: 'Play Football', cost: 5 },
  { name: 'Play Games', cost: 10 }
];
// Function to update the total points display.
function updateTotalPoints() {
  document.getElementById('totalPoints').innerText = 'Total Points: ' + totalPoints;
  localStorage.setItem('totalPoints', totalPoints);
}
// Function to update the log display.
function updateLogDisplay() {
  const logList = document.getElementById('logList');
  logList.innerHTML = ''; // Clear current log
  logs.forEach(log => {
    const li = document.createElement('li');
    li.textContent = log.comment + ': ' + log.points + ' points';
    logList.appendChild(li);
  });
  localStorage.setItem('logs', JSON.stringify(logs));
}
// Function to update the redeemable items table.
function updateItemsTable() {
  const tbody = document.querySelector('#itemsTable tbody');
  tbody.innerHTML = ''; // Clear existing rows
  items.forEach((item, index) => {
    const row = document.createElement('tr');
    const tdName = document.createElement('td');
    tdName.textContent = item.name;
    const tdCost = document.createElement('td');
    tdCost.textContent = item.cost;
    const tdAction = document.createElement('td');
    
    // Redeem button with icon
    const redeemBtn = document.createElement('button');
    redeemBtn.innerHTML = '<i class="fas fa-check"></i> Redeem';
    redeemBtn.className = 'btn';
    redeemBtn.style.marginRight = '5px';
    redeemBtn.addEventListener('click', () => redeemItem(index));
    
    // Delete button with trash icon
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
    deleteBtn.className = 'btn btn-delete';
    deleteBtn.addEventListener('click', () => deleteItem(index));
    
    tdAction.appendChild(redeemBtn);
    tdAction.appendChild(deleteBtn);
    row.appendChild(tdName);
    row.appendChild(tdCost);
    row.appendChild(tdAction);
    tbody.appendChild(row);
  });
  localStorage.setItem('items', JSON.stringify(items));
}
// Function to redeem an item: deduct points and add a log.
function redeemItem(index) {
  const item = items[index];
  if (totalPoints < item.cost) {
    alert('Not enough points to redeem this item!');
    return;
  }
  // Optional: prompt for a comment when redeeming
  const comment = prompt('Enter a comment for redeeming "' + item.name + '"', 'Redeemed ' + item.name);
  if (comment === null) return; // If user cancels, do nothing.
  totalPoints -= item.cost;
  logs.push({ comment: comment, points: -item.cost });
  updateTotalPoints();
  updateLogDisplay();
}
// Function to delete an item from the table.
function deleteItem(index) {
  if (confirm('Are you sure you want to delete "' + items[index].name + '"?')) {
    items.splice(index, 1);
    updateItemsTable();
  }
}
// Event listener for manual points update.
document.getElementById('updatePoints').addEventListener('click', function() {
  const pointsInput = document.getElementById('manualPoints').value;
  const commentInput = document.getElementById('manualComment').value;
  const points = parseInt(pointsInput);
  if (isNaN(points)) {
    alert('Please enter a valid number for points.');
    return;
  }
  totalPoints += points;
  logs.push({ comment: commentInput || 'Manual update', points: points });
  updateTotalPoints();
  updateLogDisplay();
  document.getElementById('manualPoints').value = '';
  document.getElementById('manualComment').value = '';
});
// Event listener for adding a new redeemable item.
document.getElementById('addItem').addEventListener('click', function() {
  const itemName = document.getElementById('newItemName').value.trim();
  const itemCost = parseInt(document.getElementById('newItemCost').value);
  if (!itemName || isNaN(itemCost)) {
    alert('Please enter a valid item name and cost.');
    return;
  }
  items.push({ name: itemName, cost: itemCost });
  updateItemsTable();
  document.getElementById('newItemName').value = '';
  document.getElementById('newItemCost').value = '';
});
// Event listener for clearing the logs.
document.getElementById('clearLogs').addEventListener('click', function() {
  if (confirm('Are you sure you want to clear all logs?')) {
    logs = [];
    updateLogDisplay();
  }
});
// Initialize display on page load.
updateTotalPoints();
updateLogDisplay();
updateItemsTable();
