// Load existing listings from LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    loadListings();
});

function addListing() {
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let description = document.getElementById("description").value;
    let imageInput = document.getElementById("image");

    if (!title || !price || !description || !imageInput.files.length) {
        alert("Please fill all fields!");
        return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(imageInput.files[0]);
    
    reader.onload = function () {
        let imageData = reader.result;

        let listing = {
            title: title,
            price: price,
            description: description,
            image: imageData
        };

        let listings = JSON.parse(localStorage.getItem("listings")) || [];
        listings.push(listing);
        localStorage.setItem("listings", JSON.stringify(listings));

        loadListings();
    };

    // Reset form fields
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
}

function loadListings() {
    let listingsContainer = document.getElementById("listings");
    listingsContainer.innerHTML = "";

    let listings = JSON.parse(localStorage.getItem("listings")) || [];

    listings.forEach((listing, index) => {
        let listingElement = document.createElement("div");
        listingElement.classList.add("listing");

        listingElement.innerHTML = `
            <img src="${listing.image}" alt="Item Image">
            <h2>${listing.title}</h2>
            <p><strong>Price:</strong> ₹${listing.price}</p>
            <p>${listing.description}</p>
            <button class="delete-btn" onclick="deleteListing(${index})">Delete</button>
        `;

        listingsContainer.appendChild(listingElement);
    });
}

function deleteListing(index) {
    let listings = JSON.parse(localStorage.getItem("listings")) || [];
    listings.splice(index, 1);
    localStorage.setItem("listings", JSON.stringify(listings));
    loadListings();
}
