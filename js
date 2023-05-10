// Variables to keep track of selected movie, seats, and total price
let selectedMovieIndex = 0;
let selectedSeats = [];
let totalPrice = 0;

// DOM elements
const movieSelect = document.getElementById('movie-select');
const seatMap = document.getElementById('seat-map');
const seats = seatMap.querySelectorAll('.available');
const selectedSeatsCount = document.getElementById('selected-seats');
const totalPriceCount = document.getElementById('total-price');
const bookTicketsBtn = document.getElementById('book-tickets-btn');
const cancelBookingBtn = document.getElementById('cancel-booking-btn');
const errorMessage = document.getElementById('error-message');
const countdown = document.getElementById('countdown');

// Seat colors
const availableSeatColor = 'green';
const bookedSeatColor = 'blue';
const selectedSeatColor = 'yellow';

// Seat click event listener
seats.forEach(seat => {
  seat.addEventListener('click', () => {
    // Check if seat is already selected
    if (selectedSeats.includes(seat)) {
      // Deselect seat
      deselectSeat(seat);
    } else {
      // Select seat
      selectSeat(seat);
    }
  });
});

// Movie select event listener
movieSelect.addEventListener('change', () => {
  selectedMovieIndex = movieSelect.selectedIndex;
  updateSeatMap();
});

// Book tickets button event listener
bookTicketsBtn.addEventListener('click', e => {
  e.preventDefault();
  if (selectedSeats.length === 0) {
    // Show error message if no seats are selected
    errorMessage.textContent = 'Please select at least one seat';
  } else {
    // Book selected seats and update total price
    bookSeats();
    totalPriceCount.textContent = totalPrice;
    // Clear error message
    errorMessage.textContent = '';
  }
});

// Cancel booking button event listener
cancelBookingBtn.addEventListener('click', () => {
  // Deselect all selected seats and update total price
  selectedSeats.forEach(seat => {
    deselectSeat(seat);
  });
  totalPriceCount.textContent = totalPrice;
});

// Helper functions

function selectSeat(seat) {
  // Change seat color to selected
  seat.style.backgroundColor = selectedSeatColor;
  // Add seat to selectedSeats array
  selectedSeats.push(seat);
  // Update selectedSeats count
  selectedSeatsCount.textContent = selectedSeats.length;
  // Update total price
  totalPrice += parseInt(movieSelect.options[selectedMovieIndex].value);
  totalPriceCount.textContent = totalPrice;
}

function deselectSeat(seat) {
  // Change seat color back to available or booked
  if (seat.classList.contains('available')) {
    seat.style.backgroundColor = availableSeatColor;
  } else if (seat.classList.contains('booked')) {
    seat.style.backgroundColor = bookedSeatColor;
  }
  // Remove seat from selectedSeats array
  selectedSeats.splice(selectedSeats.indexOf(seat), 1);
  // Update selectedSeats count
  selectedSeatsCount.textContent = selectedSeats.length;
  // Update total price
  totalPrice -= parseInt(movieSelect.options[selectedMovieIndex].value);
  totalPriceCount.textContent = totalPrice;
}

function updateSeatMap() {
  // Get seat map for selected movie
  const seatMapForSelectedMovie = getSeatMapForSelectedMovie();
  // Update seat colors
  seats.forEach((seat, index) => {
    if (seatMapForSelectedMovie[index] === 1) {
      // Seat is booked
      seat.style.backgroundColor = bookedSeatColor;
      seat.classList.remove('available');
      seat.classList.add('booked');
    } else {
      // Seat is available
      seat.style.backgroundColor = availableSeatColor;
      seat.classList.remove('
